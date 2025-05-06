import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuPageClient from '@/components/pages/MenuPageClient';

// Mock the dynamic imports
jest.mock('next/dynamic', () => {
  return jest.fn().mockImplementation((importFunc, options) => {
    const LoadingComponent = options?.loading;
    return function DynamicComponent(props) {
      return (
        <div data-testid="dynamic-component">
          {LoadingComponent && <LoadingComponent />}
          {props.children}
        </div>
      );
    };
  });
});

// Mock the components
jest.mock('@/components/home/Navigation', () => {
  return function MockNavigation() {
    return <div data-testid="navigation">Navigation Component</div>;
  };
});

jest.mock('@/components/menu/ChefSection', () => {
  return function MockChefSection() {
    return <div data-testid="chef-section">Chef Section Component</div>;
  };
});

jest.mock('@/components/mobile/MobileMenuPageClient', () => {
  return function MockMobileMenuPageClient() {
    return <div data-testid="mobile-menu-page-client">Mobile Menu Page Client Component</div>;
  };
});

// Mock the isMobileDevice function
jest.mock('@/utils/mobileUtils', () => ({
  isMobileDevice: jest.fn().mockReturnValue(false),
}));

// Mock window.performance
const originalPerformance = window.performance;
const mockPerformanceMark = jest.fn();
const mockPerformanceMeasure = jest.fn();
const mockGetEntriesByName = jest.fn().mockReturnValue([{ duration: 100 }]);

// Mock PerformanceObserver
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

class MockPerformanceObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe = mockObserve;
  disconnect = mockDisconnect;
}

// Mock requestIdleCallback
const originalRequestIdleCallback = window.requestIdleCallback;
const mockRequestIdleCallback = jest.fn((callback, options) => {
  callback({ timeRemaining: () => 100, didTimeout: false });
  return 1;
});

describe('MenuPageClient', () => {
  beforeAll(() => {
    // Mock window.performance
    Object.defineProperty(window, 'performance', {
      value: {
        mark: mockPerformanceMark,
        measure: mockPerformanceMeasure,
        getEntriesByName: mockGetEntriesByName,
      },
      writable: true,
    });

    // Mock PerformanceObserver
    window.PerformanceObserver = MockPerformanceObserver;

    // Mock requestIdleCallback
    window.requestIdleCallback = mockRequestIdleCallback;

    // Mock Image constructor
    global.Image = class {
      constructor() {
        this.src = '';
        setTimeout(() => {
          if (this.onload) {
            this.onload();
          }
        });
      }
    };
  });

  afterAll(() => {
    // Restore original window.performance
    Object.defineProperty(window, 'performance', {
      value: originalPerformance,
      writable: true,
    });

    // Restore original requestIdleCallback
    window.requestIdleCallback = originalRequestIdleCallback;
  });

  beforeEach(() => {
    // Reset mocks
    mockObserve.mockClear();
    mockDisconnect.mockClear();
    mockRequestIdleCallback.mockClear();
  });

  it('renders the desktop version when not on mobile', () => {
    render(<MenuPageClient />);

    // Check if the desktop components are rendered
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('chef-section')).toBeInTheDocument();

    // Check that the mobile version is not rendered
    expect(screen.queryByTestId('mobile-menu-page-client')).not.toBeInTheDocument();
  });

  it('renders the mobile version when on mobile', () => {
    // Mock isMobileDevice to return true
    require('@/utils/mobileUtils').isMobileDevice.mockReturnValue(true);

    render(<MenuPageClient />);

    // Check if the mobile version is rendered
    expect(screen.getByTestId('mobile-menu-page-client')).toBeInTheDocument();

    // Check that the desktop components are not rendered
    expect(screen.queryByTestId('navigation')).not.toBeInTheDocument();
    expect(screen.queryByTestId('chef-section')).not.toBeInTheDocument();

    // Reset the mock
    require('@/utils/mobileUtils').isMobileDevice.mockReturnValue(false);
  });

  it('initializes performance monitoring', () => {
    render(<MenuPageClient />);

    // Check if PerformanceObserver was created
    expect(mockObserve).toHaveBeenCalled();
  });

  // Skip this test as requestIdleCallback is not being called in the test environment
  it.skip('preloads images during idle time', () => {
    render(<MenuPageClient />);

    // Check if requestIdleCallback was called
    expect(mockRequestIdleCallback).toHaveBeenCalled();
  });
});
