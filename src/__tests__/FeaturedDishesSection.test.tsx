import React from 'react';
import { render, screen } from '@testing-library/react';
import FeaturedDishesSection from '@/components/menu/FeaturedDishesSection';

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

// Mock document.querySelectorAll
const originalQuerySelectorAll = document.querySelectorAll;

describe('FeaturedDishesSection', () => {
  beforeAll(() => {
    // Mock document.querySelectorAll
    document.querySelectorAll = jest.fn().mockReturnValue([]);
  });
  
  afterAll(() => {
    // Restore original method
    document.querySelectorAll = originalQuerySelectorAll;
  });
  
  it('renders the featured dishes section with all content', () => {
    render(<FeaturedDishesSection />);
    
    // Check if the section title is rendered
    expect(screen.getByText('Featured Dishes')).toBeInTheDocument();
    
    // Check if the section description is rendered
    expect(screen.getByText(/A showcase of our most celebrated creations/)).toBeInTheDocument();
    
    // Check if all dish names are rendered
    expect(screen.getByText('Butter Chicken')).toBeInTheDocument();
    expect(screen.getByText('Lamb Rogan Josh')).toBeInTheDocument();
    expect(screen.getByText('Tandoori Prawns')).toBeInTheDocument();
    expect(screen.getByText('Vegetable Biryani')).toBeInTheDocument();
    expect(screen.getByText('Mango Kulfi')).toBeInTheDocument();
    expect(screen.getByText('Masala Dosa')).toBeInTheDocument();
    
    // Check if all dish descriptions are rendered
    expect(screen.getByText(/Tender chicken in a rich, aromatic tomato and butter sauce/)).toBeInTheDocument();
    expect(screen.getByText(/Slow-cooked lamb in a fragrant Kashmiri spice blend/)).toBeInTheDocument();
    expect(screen.getByText(/Jumbo prawns marinated in yogurt and spices/)).toBeInTheDocument();
    expect(screen.getByText(/Fragrant basmati rice with seasonal vegetables/)).toBeInTheDocument();
    expect(screen.getByText(/Traditional Indian ice cream with alphonso mango/)).toBeInTheDocument();
    expect(screen.getByText(/Crispy rice crepe filled with spiced potatoes/)).toBeInTheDocument();
    
    // Check if all dish prices are rendered
    expect(screen.getByText('$28')).toBeInTheDocument();
    expect(screen.getByText('$32')).toBeInTheDocument();
    expect(screen.getByText('$36')).toBeInTheDocument();
    expect(screen.getByText('$24')).toBeInTheDocument();
    expect(screen.getByText('$14')).toBeInTheDocument();
    expect(screen.getByText('$18')).toBeInTheDocument();
    
    // Check if all dish categories are rendered
    expect(screen.getByText('Signature')).toBeInTheDocument();
    expect(screen.getByText('Chef\'s Special')).toBeInTheDocument();
    expect(screen.getByText('Seafood')).toBeInTheDocument();
    expect(screen.getByText('Vegetarian')).toBeInTheDocument();
    expect(screen.getByText('Dessert')).toBeInTheDocument();
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
    
    // Check if all Order Now buttons are rendered
    const orderButtons = screen.getAllByText('Order Now');
    expect(orderButtons).toHaveLength(6);
  });
  
  it('renders the dish images', () => {
    render(<FeaturedDishesSection />);
    
    // Check if all dish images are rendered
    const images = screen.getAllByTestId('image-component');
    expect(images).toHaveLength(6);
    
    // Check if the images have the correct src attributes
    expect(images[0]).toHaveAttribute('src', '/images/menu/gallery1.jpg?quality=75&width=800');
    expect(images[1]).toHaveAttribute('src', '/images/menu/gallery2.jpg?quality=75&width=800');
    expect(images[2]).toHaveAttribute('src', '/images/menu/gallery3.jpg?quality=75&width=800');
    expect(images[3]).toHaveAttribute('src', '/images/menu/gallery5.jpg?quality=75&width=800');
    expect(images[4]).toHaveAttribute('src', '/images/menu/gallery6.jpg?quality=75&width=800');
    expect(images[5]).toHaveAttribute('src', '/images/events/event3.jpg?quality=75&width=800');
  });
  
  it('has the correct grid layout', () => {
    const { container } = render(<FeaturedDishesSection />);
    
    // Check if the dish cards are in a grid layout
    const gridContainer = container.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3');
    expect(gridContainer).toBeInTheDocument();
    
    // Check if there are 6 dish cards
    const dishCards = container.querySelectorAll('.dish-card');
    expect(dishCards).toHaveLength(6);
  });
  
  it('calls image optimization on mount', () => {
    // Mock document.querySelectorAll to return some images
    const mockImages = [
      { complete: true, classList: { add: jest.fn() } },
      { complete: false, classList: { add: jest.fn() }, onload: null },
    ];
    
    document.querySelectorAll = jest.fn().mockReturnValue(mockImages);
    
    render(<FeaturedDishesSection />);
    
    // Check if querySelectorAll was called for dish card images
    expect(document.querySelectorAll).toHaveBeenCalledWith('.dish-card img');
    
    // Check if classList.add was called for the complete image
    expect(mockImages[0].classList.add).toHaveBeenCalledWith('loaded');
    
    // Check if onload was set for the incomplete image
    expect(mockImages[1].onload).toBeInstanceOf(Function);
    
    // Simulate the onload event
    mockImages[1].onload();
    
    // Check if classList.add was called for the incomplete image after loading
    expect(mockImages[1].classList.add).toHaveBeenCalledWith('loaded');
  });
});
