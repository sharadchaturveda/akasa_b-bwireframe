import { isMobileDevice, optimizeImagesForMobile, debounce } from '@/utils/mobileUtils';

describe('isMobileDevice', () => {
  // Save original window properties
  const originalInnerWidth = window.innerWidth;
  const originalUserAgent = navigator.userAgent;
  
  afterEach(() => {
    // Restore original window properties
    Object.defineProperty(window, 'innerWidth', {
      value: originalInnerWidth,
      writable: true,
    });
    
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      writable: true,
    });
  });
  
  it('returns true for small screen width', () => {
    // Mock window.innerWidth to be less than 768
    Object.defineProperty(window, 'innerWidth', {
      value: 500,
      writable: true,
    });
    
    expect(isMobileDevice()).toBe(true);
  });
  
  it('returns true for mobile user agent', () => {
    // Mock window.innerWidth to be greater than 768
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
    });
    
    // Mock navigator.userAgent to be a mobile device
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      writable: true,
    });
    
    expect(isMobileDevice()).toBe(true);
  });
  
  it('returns false for desktop device', () => {
    // Mock window.innerWidth to be greater than 768
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
    });
    
    // Mock navigator.userAgent to be a desktop device
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      writable: true,
    });
    
    expect(isMobileDevice()).toBe(false);
  });
});

describe('optimizeImagesForMobile', () => {
  // Mock document.querySelectorAll
  const originalQuerySelectorAll = document.querySelectorAll;
  
  beforeAll(() => {
    // Mock document.querySelectorAll
    document.querySelectorAll = jest.fn();
  });
  
  afterAll(() => {
    // Restore original method
    document.querySelectorAll = originalQuerySelectorAll;
  });
  
  it('optimizes images for mobile', () => {
    // Create mock images
    const mockImages = [
      { loading: '', decoding: '', onerror: null },
      { loading: '', decoding: '', onerror: null },
      { loading: '', decoding: '', onerror: null },
      { loading: '', decoding: '', onerror: null },
      { loading: '', decoding: '', onerror: null },
    ];
    
    // Mock document.querySelectorAll to return the mock images
    document.querySelectorAll = jest.fn().mockReturnValue(mockImages);
    
    optimizeImagesForMobile();
    
    // Check if querySelectorAll was called for images
    expect(document.querySelectorAll).toHaveBeenCalledWith('img');
    
    // Check if the first 3 images were not set to lazy load
    expect(mockImages[0].loading).not.toBe('lazy');
    expect(mockImages[1].loading).not.toBe('lazy');
    expect(mockImages[2].loading).not.toBe('lazy');
    
    // Check if the remaining images were set to lazy load
    expect(mockImages[3].loading).toBe('lazy');
    expect(mockImages[4].loading).toBe('lazy');
    
    // Check if all images were set to async decoding
    mockImages.forEach(img => {
      expect(img.decoding).toBe('async');
      expect(img.onerror).toBeInstanceOf(Function);
    });
  });
});

describe('debounce', () => {
  // Mock setTimeout and clearTimeout
  jest.useFakeTimers();
  
  it('debounces a function call', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);
    
    // Call the debounced function
    debouncedFn();
    
    // Check that the original function was not called yet
    expect(mockFn).not.toHaveBeenCalled();
    
    // Fast-forward time
    jest.advanceTimersByTime(100);
    
    // Check that the original function was called
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  
  it('only calls the function once when called multiple times within the wait period', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);
    
    // Call the debounced function multiple times
    debouncedFn();
    debouncedFn();
    debouncedFn();
    
    // Check that the original function was not called yet
    expect(mockFn).not.toHaveBeenCalled();
    
    // Fast-forward time
    jest.advanceTimersByTime(100);
    
    // Check that the original function was called only once
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  
  it('resets the timer when called again within the wait period', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);
    
    // Call the debounced function
    debouncedFn();
    
    // Fast-forward time partially
    jest.advanceTimersByTime(50);
    
    // Call the debounced function again
    debouncedFn();
    
    // Fast-forward time to just after the first wait period
    jest.advanceTimersByTime(50);
    
    // Check that the original function was not called yet
    expect(mockFn).not.toHaveBeenCalled();
    
    // Fast-forward time to complete the second wait period
    jest.advanceTimersByTime(50);
    
    // Check that the original function was called only once
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
