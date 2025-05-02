import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HomePage from '@/app/page';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

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
    return <nav data-testid="navigation" aria-label="Main Navigation">Navigation Component</nav>;
  };
});

jest.mock('@/components/home/ScrollBehavior', () => {
  return function MockScrollBehavior() {
    return <div data-testid="scroll-behavior">Scroll Behavior Component</div>;
  };
});

jest.mock('@/components/home/HeroSection', () => {
  return function MockHeroSection() {
    return (
      <section data-testid="hero-section" aria-labelledby="hero-heading">
        <h1 id="hero-heading">Exquisite Indian Cuisine</h1>
        <p>Fine Dining at the Heart of Singapore</p>
      </section>
    );
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

describe('HomePage Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<HomePage />);
    
    // Run axe on the rendered component
    const results = await axe(container);
    
    // Check for accessibility violations
    expect(results).toHaveNoViolations();
  });
  
  it('should have proper heading structure', () => {
    render(<HomePage />);
    
    // Check if there's at least one h1 element
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements.length).toBeGreaterThan(0);
  });
  
  it('should have proper navigation landmarks', () => {
    render(<HomePage />);
    
    // Check if there's a navigation landmark
    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();
    expect(navigation).toHaveAttribute('aria-label', 'Main Navigation');
  });
  
  it('should have proper main landmark', () => {
    render(<HomePage />);
    
    // Check if there's a main landmark
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });
});
