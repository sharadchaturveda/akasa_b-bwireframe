import React from 'react';
import { render, screen } from '@testing-library/react';
import Navigation from '@/components/home/Navigation';

// Mock the next/link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  },
}));

// Mock the next/navigation usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock the isMobileDevice function
jest.mock('@/utils/mobileUtils', () => ({
  isMobileDevice: jest.fn().mockReturnValue(false),
}));

// Mock the MobileNavigation component
jest.mock('@/components/mobile/MobileNavigation', () => {
  return function MockMobileNavigation({ navItems }: { navItems: Array<{ name: string; path: string }> }) {
    return (
      <div data-testid="mobile-navigation">
        {navItems.map((item) => (
          <div key={item.name} data-testid="mobile-nav-item">
            {item.name}: {item.path}
          </div>
        ))}
      </div>
    );
  };
});

describe('Navigation', () => {
  it('renders the navigation with correct links on homepage', () => {
    // Mock the usePathname hook to return '/' (homepage)
    require('next/navigation').usePathname.mockReturnValue('/');
    
    render(<Navigation />);
    
    // Check if the navigation links are rendered
    const menuLink = screen.getByText('MENUS');
    expect(menuLink).toBeInTheDocument();
    expect(menuLink).toHaveAttribute('href', '/menu');
    
    const eventsLink = screen.getByText('EVENTS');
    expect(eventsLink).toBeInTheDocument();
    expect(eventsLink).toHaveAttribute('href', '/events');
    
    const offersLink = screen.getByText('OFFERS');
    expect(offersLink).toBeInTheDocument();
    expect(offersLink).toHaveAttribute('href', '/offers');
    
    const reservationsLink = screen.getByText('RESERVATIONS');
    expect(reservationsLink).toBeInTheDocument();
    expect(reservationsLink).toHaveAttribute('href', '/reservations');
    
    // Check that HOME link is not rendered on homepage
    const homeLink = screen.queryByText('HOME');
    expect(homeLink).not.toBeInTheDocument();
    
    // Check if the mobile navigation is rendered
    const mobileNavigation = screen.getByTestId('mobile-navigation');
    expect(mobileNavigation).toBeInTheDocument();
  });
  
  it('renders the navigation with HOME link on other pages', () => {
    // Mock the usePathname hook to return '/menu' (not homepage)
    require('next/navigation').usePathname.mockReturnValue('/menu');
    
    render(<Navigation />);
    
    // Check if the HOME link is rendered
    const homeLink = screen.getByText('HOME');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    
    // Check that MENUS link is not rendered on menu page
    const menuLink = screen.queryByText('MENUS');
    expect(menuLink).not.toBeInTheDocument();
    
    // Check if other links are rendered
    const eventsLink = screen.getByText('EVENTS');
    expect(eventsLink).toBeInTheDocument();
    
    const offersLink = screen.getByText('OFFERS');
    expect(offersLink).toBeInTheDocument();
    
    const reservationsLink = screen.getByText('RESERVATIONS');
    expect(reservationsLink).toBeInTheDocument();
  });
});
