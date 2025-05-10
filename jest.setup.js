// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock PerformanceObserver
class MockPerformanceObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn();
}

// Add static property to the class
MockPerformanceObserver.supportedEntryTypes = ['largest-contentful-paint', 'layout-shift', 'first-input', 'paint'];

// Create a proper mock that includes the required static property
const PerformanceObserverMock = function(callback) {
  return new MockPerformanceObserver(callback);
};
PerformanceObserverMock.supportedEntryTypes = MockPerformanceObserver.supportedEntryTypes;

Object.defineProperty(window, 'PerformanceObserver', {
  writable: true,
  value: PerformanceObserverMock,
});
