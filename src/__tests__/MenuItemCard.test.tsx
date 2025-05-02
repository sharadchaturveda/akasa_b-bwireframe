import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuItemCard from '@/components/menu/MenuItemCard';

describe('MenuItemCard', () => {
  it('renders a vegetarian menu item correctly', () => {
    const item = {
      name: 'Paneer Tikka',
      description: 'Cottage cheese marinated in spices',
      price: '$10',
      vegetarian: true,
    };
    
    render(<MenuItemCard item={item} />);
    
    // Check if the item name is rendered
    expect(screen.getByText('Paneer Tikka')).toBeInTheDocument();
    
    // Check if the item description is rendered
    expect(screen.getByText('Cottage cheese marinated in spices')).toBeInTheDocument();
    
    // Check if the item price is rendered
    expect(screen.getByText('$10')).toBeInTheDocument();
    
    // Check if the vegetarian indicator (green circle) is rendered
    const vegetarianIndicator = screen.getByText('🟢');
    expect(vegetarianIndicator).toBeInTheDocument();
  });
  
  it('renders a non-vegetarian menu item correctly', () => {
    const item = {
      name: 'Chicken Tikka',
      description: 'Tender chicken marinated in spices',
      price: '$12',
      vegetarian: false,
    };
    
    render(<MenuItemCard item={item} />);
    
    // Check if the item name is rendered
    expect(screen.getByText('Chicken Tikka')).toBeInTheDocument();
    
    // Check if the item description is rendered
    expect(screen.getByText('Tender chicken marinated in spices')).toBeInTheDocument();
    
    // Check if the item price is rendered
    expect(screen.getByText('$12')).toBeInTheDocument();
    
    // Check if the non-vegetarian indicator (red circle) is rendered
    const nonVegetarianIndicator = screen.getByText('🔴');
    expect(nonVegetarianIndicator).toBeInTheDocument();
  });
  
  it('has the correct styling and structure', () => {
    const item = {
      name: 'Samosa',
      description: 'Crispy pastry filled with spiced potatoes',
      price: '$8',
      vegetarian: true,
    };
    
    const { container } = render(<MenuItemCard item={item} />);
    
    // Check if the card has the correct classes
    const card = container.firstChild;
    expect(card).toHaveClass('group');
    expect(card).toHaveClass('relative');
    
    // Check if the card has the hover effect elements
    const glowEffect = container.querySelector('.absolute.-inset-0\\.5');
    expect(glowEffect).toBeInTheDocument();
    
    // Check if the card content has the correct classes
    const cardContent = container.querySelector('.relative.bg-black\\/80');
    expect(cardContent).toBeInTheDocument();
    
    // Check if the card has the decorative corner accent
    const cornerAccent = container.querySelector('.absolute.bottom-0.right-0');
    expect(cornerAccent).toBeInTheDocument();
  });
});
