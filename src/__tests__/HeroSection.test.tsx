import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/home/HeroSection';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Convert boolean props to strings to avoid React warnings
    const imgProps = { ...props };
    if (typeof imgProps.fill === 'boolean') {
      imgProps.fill = imgProps.fill.toString();
    }
    if (typeof imgProps.priority === 'boolean') {
      imgProps.priority = imgProps.priority.toString();
    }

    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...imgProps} />;
  },
}));

// Mock the next/link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  },
}));

// Mock the Button component
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, className }: { children: React.ReactNode; className: string }) => {
    return <button className={className}>{children}</button>;
  },
}));

// Mock the MobileHeroButton component
jest.mock('@/components/mobile/MobileHeroButton', () => ({
  MobileHeroButton: ({ children, className }: { children: React.ReactNode; className: string }) => {
    return <button className={className} data-testid="mobile-hero-button">{children}</button>;
  },
}));

// Mock the isMobileDevice function
jest.mock('@/utils/mobileUtils', () => ({
  isMobileDevice: jest.fn().mockReturnValue(false),
}));

// Mock the Logo component
jest.mock('@/components/brand/Logo', () => {
  return function MockLogo() {
    return <div data-testid="logo-component">Logo Component</div>;
  };
});

describe('HeroSection', () => {
  it('renders the hero section with content and logo', () => {
    render(<HeroSection />);

    // Check if the logo is rendered
    const logo = screen.getByTestId('logo-component');
    expect(logo).toBeInTheDocument();

    // Check if the hero background is rendered
    const heroBackground = screen.getByAltText('Hero background');
    expect(heroBackground).toBeInTheDocument();
    expect(heroBackground).toHaveAttribute('id', 'lcp-image');

    // Check if the heading is rendered
    expect(screen.getByText('Exquisite Indian Cuisine')).toBeInTheDocument();

    // Check if the subheadings are rendered
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Fine Dining at the Heart of Singapore')).toBeInTheDocument();

    // Check if the button is rendered
    expect(screen.getByText('Explore Menu')).toBeInTheDocument();

    // Check if the link to the menu page is rendered
    const menuLink = screen.getByRole('link');
    expect(menuLink).toHaveAttribute('href', '/menu');
  });

  it('renders the desktop button when not on mobile', () => {
    render(<HeroSection />);

    // Check if the desktop button is rendered
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[#1A2A3A]');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('hover:bg-[#0A1A2A]');
  });

  it('renders the mobile button when on mobile', () => {
    // Mock the isMobileDevice function to return true
    require('@/utils/mobileUtils').isMobileDevice.mockReturnValue(true);

    render(<HeroSection />);

    // Check if the mobile button is rendered
    const mobileButton = screen.getByTestId('mobile-hero-button');
    expect(mobileButton).toBeInTheDocument();

    // Reset the mock
    require('@/utils/mobileUtils').isMobileDevice.mockReturnValue(false);
  });
});
