import React from 'react';
import { render, screen } from '@testing-library/react';
import FlavorExperienceSection from '@/components/menu/FlavorExperienceSection';

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

describe('FlavorExperienceSection', () => {
  it('renders the flavor experience section with all content', () => {
    render(<FlavorExperienceSection />);
    
    // Check if the section titles are rendered
    expect(screen.getByText('A culinary journey')).toBeInTheDocument();
    expect(screen.getByText('Experience the Flavors of India')).toBeInTheDocument();
    expect(screen.getByText('Our Culinary Philosophy')).toBeInTheDocument();
    
    // Check if the section descriptions are rendered
    expect(screen.getByText(/Our menu celebrates India's diverse culinary landscape/)).toBeInTheDocument();
    expect(screen.getByText(/At Akasa, food is a celebration of culture and tradition/)).toBeInTheDocument();
    
    // Check if the philosophy cards are rendered
    expect(screen.getByText('Tradition')).toBeInTheDocument();
    expect(screen.getByText('Quality')).toBeInTheDocument();
    expect(screen.getByText('Innovation')).toBeInTheDocument();
    
    // Check if the philosophy descriptions are rendered
    expect(screen.getByText(/Honoring authentic recipes passed down through generations/)).toBeInTheDocument();
    expect(screen.getByText(/Sourcing the finest ingredients and authentic spices/)).toBeInTheDocument();
    expect(screen.getByText(/Elevating classic flavors with creative techniques/)).toBeInTheDocument();
    
    // Check if the reservation button is rendered
    expect(screen.getByText('Reserve a Table')).toBeInTheDocument();
    
    // Check if the link has the correct href
    const reservationLink = screen.getByTestId('link-component');
    expect(reservationLink).toHaveAttribute('href', '/reservations');
  });
  
  it('renders the background images', () => {
    render(<FlavorExperienceSection />);
    
    // Check if the background images are rendered
    const images = screen.getAllByTestId('image-component');
    expect(images).toHaveLength(2);
    
    // Check if the images have the correct src attributes
    expect(images[0]).toHaveAttribute('src', '/images/home/philosophy-bg.jpg');
    expect(images[1]).toHaveAttribute('src', '/images/home/drink.jpg');
  });
  
  it('has the correct layout structure', () => {
    const { container } = render(<FlavorExperienceSection />);
    
    // Check if the section has the correct grid layout
    const gridContainer = container.querySelector('.grid-cols-1.md\\:grid-cols-\\[40\\%_60\\%\\]');
    expect(gridContainer).toBeInTheDocument();
    
    // Check if the section has the correct styling
    expect(container.firstChild).toHaveClass('w-full');
    expect(container.firstChild).toHaveClass('relative');
    expect(container.firstChild).toHaveClass('overflow-hidden');
  });
});
