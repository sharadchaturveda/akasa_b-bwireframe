import React from 'react';
import { render, screen } from '@testing-library/react';
import MobileMenuPageClient from '@/components/mobile/MobileMenuPageClient';

// Mock the components
jest.mock('@/components/home/Navigation', () => {
  return function MockNavigation() {
    return <div data-testid="navigation">Navigation Component</div>;
  };
});

jest.mock('@/components/home/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer Component</div>;
  };
});

jest.mock('@/components/mobile/MobileOptimizer', () => {
  return function MockMobileOptimizer() {
    return <div data-testid="mobile-optimizer">Mobile Optimizer Component</div>;
  };
});

jest.mock('@/components/mobile/MobileMenuChefSection', () => {
  return function MockMobileMenuChefSection() {
    return <div data-testid="mobile-menu-chef-section">Mobile Menu Chef Section Component</div>;
  };
});

jest.mock('@/components/mobile/MobileMenusSection', () => {
  return function MockMobileMenusSection() {
    return <div data-testid="mobile-menus-section">Mobile Menus Section Component</div>;
  };
});

jest.mock('@/components/mobile/MobileFlavorExperienceSection', () => {
  return function MockMobileFlavorExperienceSection() {
    return <div data-testid="mobile-flavor-experience-section">Mobile Flavor Experience Section Component</div>;
  };
});

jest.mock('@/components/mobile/MobileFeaturedDishesSection', () => {
  return function MockMobileFeaturedDishesSection() {
    return <div data-testid="mobile-featured-dishes-section">Mobile Featured Dishes Section Component</div>;
  };
});

describe('MobileMenuPageClient', () => {
  it('renders all mobile components', () => {
    render(<MobileMenuPageClient />);
    
    // Check if all mobile components are rendered
    expect(screen.getByTestId('mobile-optimizer')).toBeInTheDocument();
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-menu-chef-section')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-menus-section')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-flavor-experience-section')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-featured-dishes-section')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  
  it('renders with the correct layout', () => {
    const { container } = render(<MobileMenuPageClient />);
    
    // Check if the main element has the correct classes
    const mainElement = container.querySelector('main');
    expect(mainElement).toHaveClass('min-h-screen');
    expect(mainElement).toHaveClass('bg-black');
    expect(mainElement).toHaveClass('text-white');
  });
});
