import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MobileNavigation from '@/components/mobile/MobileNavigation';

// Mock window.scrollTo
const originalScrollTo = window.scrollTo;
beforeAll(() => {
  window.scrollTo = jest.fn();
});

afterAll(() => {
  window.scrollTo = originalScrollTo;
});



// Sample navigation items
const navItems = [
  { name: "HOME", path: "/" },
  { name: "MENUS", path: "/menu" },
  { name: "EVENTS", path: "/events" },
  { name: "OFFERS", path: "/offers" },
  { name: "RESERVATIONS", path: "/reservations" }
];

describe('MobileNavigation', () => {
  it('renders the mobile navigation with hamburger button', () => {
    render(<MobileNavigation navItems={navItems} />);

    // Check if the hamburger button is rendered
    const hamburgerButton = screen.getByLabelText('Toggle menu');
    expect(hamburgerButton).toBeInTheDocument();

    // Check that the menu is not visible initially
    expect(screen.queryByText('HOME')).not.toBeInTheDocument();
  });

  it('opens the mobile menu when hamburger button is clicked', () => {
    render(<MobileNavigation navItems={navItems} />);

    // Click the hamburger button
    const hamburgerButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(hamburgerButton);

    // Check if the menu items are rendered
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('MENUS')).toBeInTheDocument();
    expect(screen.getByText('EVENTS')).toBeInTheDocument();
    expect(screen.getByText('OFFERS')).toBeInTheDocument();
    expect(screen.getByText('RESERVATIONS')).toBeInTheDocument();

    // Check if the close button is rendered
    const closeButton = screen.getByLabelText('Close menu');
    expect(closeButton).toBeInTheDocument();
  });

  it('closes the mobile menu when close button is clicked', () => {
    render(<MobileNavigation navItems={navItems} />);

    // Open the menu
    const hamburgerButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(hamburgerButton);

    // Check if the menu is open
    expect(screen.getByText('HOME')).toBeInTheDocument();

    // Close the menu
    const closeButton = screen.getByLabelText('Close menu');
    fireEvent.click(closeButton);

    // Check if the menu is closed
    expect(screen.queryByText('HOME')).not.toBeInTheDocument();
  });

  it('closes the mobile menu when a menu item is clicked', () => {
    // Mock window.location.href
    const originalLocation = window.location;
    delete window.location;
    window.location = { ...originalLocation, href: '' };

    render(<MobileNavigation navItems={navItems} />);

    // Open the menu
    const hamburgerButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(hamburgerButton);

    // Click a menu item
    const menuItem = screen.getByText('HOME');
    fireEvent.click(menuItem);

    // Check if the menu is closed
    expect(screen.queryByText('HOME')).not.toBeInTheDocument();

    // Check if the navigation happened
    expect(window.location.href).toBe('/');

    // Restore window.location
    window.location = originalLocation;
  });
});
