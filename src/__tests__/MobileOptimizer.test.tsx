import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MobileOptimizer from '@/components/mobile/MobileOptimizer';

// Mock the mobile utilities
jest.mock('@/utils/mobileUtils', () => ({
  optimizeImagesForMobile: jest.fn(),
  debounce: jest.fn().mockImplementation((fn) => fn),
  isMobileDevice: jest.fn().mockReturnValue(true),
}));

describe('MobileOptimizer', () => {
  it('calls optimizeImagesForMobile on mount', () => {
    render(<MobileOptimizer />);
    
    // Check if optimizeImagesForMobile was called
    expect(require('@/utils/mobileUtils').optimizeImagesForMobile).toHaveBeenCalled();
  });
  
  it('calls optimizeImagesForMobile on resize', () => {
    render(<MobileOptimizer />);
    
    // Reset the mock to clear the initial call
    require('@/utils/mobileUtils').optimizeImagesForMobile.mockClear();
    
    // Simulate a resize event
    fireEvent(window, new Event('resize'));
    
    // Check if optimizeImagesForMobile was called again
    expect(require('@/utils/mobileUtils').optimizeImagesForMobile).toHaveBeenCalled();
  });
  
  it('calls optimizeImagesForMobile on orientation change', () => {
    render(<MobileOptimizer />);
    
    // Reset the mock to clear the initial call
    require('@/utils/mobileUtils').optimizeImagesForMobile.mockClear();
    
    // Simulate an orientation change event
    fireEvent(window, new Event('orientationchange'));
    
    // Check if optimizeImagesForMobile was called again
    expect(require('@/utils/mobileUtils').optimizeImagesForMobile).toHaveBeenCalled();
  });
  
  it('removes event listeners on unmount', () => {
    // Spy on window.removeEventListener
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    
    const { unmount } = render(<MobileOptimizer />);
    
    // Unmount the component
    unmount();
    
    // Check if removeEventListener was called for resize and orientationchange
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('orientationchange', expect.any(Function));
    
    // Restore the spy
    removeEventListenerSpy.mockRestore();
  });
});
