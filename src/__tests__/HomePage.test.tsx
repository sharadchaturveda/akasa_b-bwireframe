import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock the dynamic imports
jest.mock('next/dynamic', () => {
  return jest.fn().mockImplementation((importFunc, options) => {
    const LoadingComponent = options?.loading;
    return function DynamicComponent(props: any) {
      return (
        <div data-testid="mocked-dynamic-component">
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

jest.mock('@/components/home/ScrollBehavior', () => {
  return function MockScrollBehavior() {
    return <div data-testid="scroll-behavior">Scroll Behavior Component</div>;
  };
});

jest.mock('@/components/home/HeroSection', () => {
  return function MockHeroSection() {
    return <div data-testid="hero-section">Hero Section Component</div>;
  };
});

jest.mock('@/components/home/HomePerformanceOptimizer', () => {
  return function MockHomePerformanceOptimizer() {
    return <div data-testid="home-performance-optimizer">Home Performance Optimizer Component</div>;
  };
});

jest.mock('@/components/mobile/MobileOptimizer', () => {
  return function MockMobileOptimizer() {
    return <div data-testid="mobile-optimizer">Mobile Optimizer Component</div>;
  };
});

jest.mock('@/utils/loadPageStyles', () => ({
  loadPageStyles: jest.fn(),
  preloadPageStyles: jest.fn(),
}));

// Mock window.performance
const originalPerformance = window.performance;
const mockPerformanceMark = jest.fn();
const mockPerformanceMeasure = jest.fn();
const mockGetEntriesByName = jest.fn().mockReturnValue([{ duration: 100 }]);

beforeAll(() => {
  Object.defineProperty(window, 'performance', {
    value: {
      mark: mockPerformanceMark,
      measure: mockPerformanceMeasure,
      getEntriesByName: mockGetEntriesByName,
    },
    writable: true,
  });
});

afterAll(() => {
  Object.defineProperty(window, 'performance', {
    value: originalPerformance,
    writable: true,
  });
});

// Mock PerformanceObserver
class MockPerformanceObserver {
  constructor(callback: any) {
    this.callback = callback;
  }
  callback: any;
  observe = jest.fn();
  disconnect = jest.fn();
}

beforeAll(() => {
  Object.defineProperty(window, 'PerformanceObserver', {
    value: MockPerformanceObserver,
    writable: true,
  });
});

describe('HomePage', () => {
  it('renders the home page with all critical components', () => {
    render(<HomePage />);

    // Check if critical components are rendered
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-behavior')).toBeInTheDocument();
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('home-performance-optimizer')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-optimizer')).toBeInTheDocument();

    // Check if the main container is rendered
    expect(screen.getByRole('main')).toHaveClass('w-full min-h-screen bg-black text-white');
  });

  it('renders suspense fallbacks for dynamic components', () => {
    render(<HomePage />);

    // Check for suspense fallbacks
    const fallbacks = screen.getAllByTestId('mocked-dynamic-component');
    expect(fallbacks.length).toBeGreaterThan(0);

    // Check for specific fallback heights
    const fallbackDivs = screen.getAllByRole('generic', { hidden: true });
    const minHeightClasses = [
      'min-h-[45vh]', 'min-h-[30vh]', 'min-h-[40vh]',
      'min-h-[50vh]', 'min-h-[40vh]', 'min-h-[30vh]', 'min-h-[20vh]'
    ];

    minHeightClasses.forEach(heightClass => {
      const elements = Array.from(fallbackDivs).filter(div =>
        div.className && div.className.includes(heightClass)
      );
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('initializes performance measurements', () => {
    render(<HomePage />);

    // Check if performance mark was called
    expect(mockPerformanceMark).toHaveBeenCalledWith('homepage_start');

    // Simulate load event
    window.dispatchEvent(new Event('load'));

    // Check if performance measurements were made
    expect(mockPerformanceMark).toHaveBeenCalledWith('homepage_loaded');
    expect(mockPerformanceMeasure).toHaveBeenCalledWith(
      'homepage_load_time',
      'homepage_start',
      'homepage_loaded'
    );
    expect(mockGetEntriesByName).toHaveBeenCalledWith('homepage_load_time');
  });
});
