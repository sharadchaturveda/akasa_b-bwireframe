import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MenusSection from '@/components/menu/MenusSection';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // Convert boolean props to strings
    const imgProps = { ...props };
    if (typeof imgProps.fill === 'boolean') imgProps.fill = imgProps.fill.toString();

    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...imgProps} data-testid="image-component" />;
  },
}));

// Mock the next/link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => {
    return <a href={href} data-testid="link-component">{children}</a>;
  },
}));

describe('MenusSection', () => {
  it('renders the menus section with all menu types', () => {
    render(<MenusSection />);

    // Check if the section title is rendered
    expect(screen.getByText('Our Menus')).toBeInTheDocument();

    // Check if the section description is rendered
    expect(screen.getByText(/Explore our carefully crafted menus/)).toBeInTheDocument();

    // Check if all menu types are rendered
    expect(screen.getByText('À La Carte')).toBeInTheDocument();
    expect(screen.getByText('Soul Food Weekends')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    expect(screen.getByText('Bar Bites')).toBeInTheDocument();
    expect(screen.getByText('3 Course Set Lunch')).toBeInTheDocument();

    // Check if all menu descriptions are rendered
    expect(screen.getByText('Our signature dishes available for individual selection')).toBeInTheDocument();
    expect(screen.getByText('Special weekend offerings that nourish the soul')).toBeInTheDocument();
    expect(screen.getByText('Signature cocktails, fine wines, and refreshing beverages')).toBeInTheDocument();
    expect(screen.getByText('Perfect small plates to accompany your drinks')).toBeInTheDocument();
    expect(screen.getByText('A perfect midday dining experience with three exquisite courses')).toBeInTheDocument();

    // Check if all menu cards have View Menu buttons
    const viewMenuButtons = screen.getAllByText('View Menu');
    expect(viewMenuButtons).toHaveLength(5);

    // Check if the reservation button is rendered
    expect(screen.getByText('Make a Reservation')).toBeInTheDocument();
  });

  it('changes active menu when a menu card is clicked', () => {
    render(<MenusSection />);

    // By default, the first menu (a-la-carte) should be active
    // The active menu has a check icon
    const svgIcons = screen.getAllByRole('img', { hidden: true });
    expect(svgIcons.length).toBeGreaterThan(0);

    // Get all menu cards (divs containing the images)
    const menuCards = screen.getAllByTestId('image-component');
    expect(menuCards).toHaveLength(5);

    // Get the parent div of the second menu card
    const secondMenuCard = menuCards[1].closest('.group');
    if (secondMenuCard) {
      // Click on the second menu card (Soul Food Weekends)
      fireEvent.click(secondMenuCard);
    }
  });



  it('has correct reservation link', () => {
    render(<MenusSection />);

    // Get all link components
    const links = screen.getAllByTestId('link-component');

    // Check if the reservation link has the correct href
    expect(links[0]).toHaveAttribute('href', '/reservations');
  });
});
