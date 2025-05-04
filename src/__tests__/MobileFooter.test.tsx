import React from 'react';
import { render, screen } from '@testing-library/react';
import MobileFooter from '@/components/mobile/MobileFooter';

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

describe('MobileFooter', () => {
  it('renders the mobile footer with all elements', () => {
    render(<MobileFooter />);



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
  });

  it('has proper mobile-specific styling', () => {
    render(<MobileFooter />);

    // Check if the navigation links are in a grid layout
    const navContainer = screen.getByText('Home').parentElement;
    expect(navContainer).toHaveClass('grid');
    expect(navContainer).toHaveClass('grid-cols-3');

    // Check if the social icons are centered
    const socialContainer = screen.getAllByRole('link', { name: '' })[0].parentElement;
    expect(socialContainer).toHaveClass('flex');
    expect(socialContainer).toHaveClass('justify-center');
  });
});
