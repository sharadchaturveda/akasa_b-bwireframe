import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock window.scrollTo
const originalScrollTo = window.scrollTo;
beforeAll(() => {
  window.scrollTo = jest.fn();
});

afterAll(() => {
  window.scrollTo = originalScrollTo;
});

// Mock the next/navigation usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
}));

// Mock the components with interactive elements
jest.mock('@/components/home/Navigation', () => {
  return function MockNavigation() {
    return (
      <nav data-testid="navigation" aria-label="Main Navigation">
        <a href="/menu" data-testid="menu-link">MENUS</a>
        <a href="/events" data-testid="events-link">EVENTS</a>
        <a href="/offers" data-testid="offers-link">OFFERS</a>
        <a href="/reservations" data-testid="reservations-link">RESERVATIONS</a>
      </nav>
    );
  };
});

jest.mock('@/components/home/HeroSection', () => {
  return function MockHeroSection() {
    return (
      <section data-testid="hero-section" aria-labelledby="hero-heading">
        <h1 id="hero-heading">Exquisite Indian Cuisine</h1>
        <p>Fine Dining at the Heart of Singapore</p>
        <a href="/menu" data-testid="explore-menu-button">Explore Menu</a>
      </section>
    );
  };
});

// Mock other components
jest.mock('@/components/home/ScrollBehavior', () => {
  return function MockScrollBehavior() {
    return <div data-testid="scroll-behavior">Scroll Behavior Component</div>;
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

// Mock dynamic imports
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

describe('HomePage Integration', () => {
  // Mock window.location
  const originalLocation = window.location;
  let locationHref = '';

  beforeAll(() => {
    // Create a custom location object
    delete window.location;
    window.location = {
      ...originalLocation,
      get href() {
        return locationHref;
      },
      set href(value) {
        locationHref = value;
      }
    };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  beforeEach(() => {
    // Reset locationHref before each test
    locationHref = '';
  });

  it('should have navigation links to all main pages', () => {
    render(<HomePage />);

    // Check if all navigation links are rendered
    const menuLink = screen.getByTestId('menu-link');
    const eventsLink = screen.getByTestId('events-link');
    const offersLink = screen.getByTestId('offers-link');
    const reservationsLink = screen.getByTestId('reservations-link');

    // Check if the links have the correct href attributes
    expect(menuLink).toHaveAttribute('href', '/menu');
    expect(eventsLink).toHaveAttribute('href', '/events');
    expect(offersLink).toHaveAttribute('href', '/offers');
    expect(reservationsLink).toHaveAttribute('href', '/reservations');
  });

  it('should have an explore menu button in the hero section', () => {
    render(<HomePage />);

    // Check if the explore menu button is rendered
    const exploreMenuButton = screen.getByTestId('explore-menu-button');

    // Check if the button has the correct href attribute
    expect(exploreMenuButton).toHaveAttribute('href', '/menu');
  });

  it('should initialize performance measurements when the page loads', () => {
    render(<HomePage />);

    // Check if performance mark was called
    expect(mockPerformanceMark).toHaveBeenCalledWith('homepage_start');

    // Simulate load event
    act(() => {
      window.dispatchEvent(new Event('load'));
    });

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
