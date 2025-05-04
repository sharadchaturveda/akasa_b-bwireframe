import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/home/Footer';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Convert boolean props to strings to avoid React warnings
    const imgProps = { ...props };

    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...imgProps} data-testid="image-component" />;
  },
}));

// Mock the next/link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href} data-testid="link-component">{children}</a>;
  },
}));

// Mock the isMobileDevice function
jest.mock('@/utils/mobileUtils', () => ({
  isMobileDevice: jest.fn().mockReturnValue(false),
}));

// Mock the MobileFooter component
jest.mock('@/components/mobile/MobileFooter', () => {
  return function MockMobileFooter() {
    return <div data-testid="mobile-footer">Mobile Footer</div>;
  };
});

describe('Footer', () => {
  it('renders the desktop footer when not on mobile', () => {
    render(<Footer />);

    // Check if the copyright is rendered
    expect(screen.getByText('© 2025 Akasa')).toBeInTheDocument();

    // Check if the navigation links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Menus')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Offers')).toBeInTheDocument();
    expect(screen.getByText('Reservations')).toBeInTheDocument();

    // Check if the social icons are rendered
    const socialLinks = screen.getAllByRole('link', { name: '' });
    expect(socialLinks.length).toBe(3);
    expect(socialLinks[0]).toHaveAttribute('href', 'https://instagram.com');
    expect(socialLinks[1]).toHaveAttribute('href', 'https://facebook.com');
    expect(socialLinks[2]).toHaveAttribute('href', 'https://twitter.com');

    // Check that the mobile footer is not rendered
    expect(screen.queryByTestId('mobile-footer')).not.toBeInTheDocument();
  });

  it('renders the mobile footer when on mobile', () => {
    // Mock the isMobileDevice function to return true
    require('@/utils/mobileUtils').isMobileDevice.mockReturnValue(true);

    render(<Footer />);

    // Check if the mobile footer is rendered
    expect(screen.getByTestId('mobile-footer')).toBeInTheDocument();

    // Check that the desktop footer elements are not rendered
    expect(screen.queryByText('© 2025 Akasa')).not.toBeInTheDocument();

    // Reset the mock
    require('@/utils/mobileUtils').isMobileDevice.mockReturnValue(false);
  });
});
