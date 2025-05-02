import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuCategorySection from '@/components/menu/MenuCategorySection';

// Mock the MenuItemCard component
jest.mock('@/components/menu/MenuItemCard', () => {
  return function MockMenuItemCard({ item }) {
    return (
      <div data-testid="menu-item-card">
        <div data-testid="item-name">{item.name}</div>
        <div data-testid="item-description">{item.description}</div>
        <div data-testid="item-price">{item.price}</div>
      </div>
    );
  };
});

// Mock the CategoryNotes component
jest.mock('@/components/menu/CategoryNotes', () => {
  return function MockCategoryNotes({ notes }) {
    return <div data-testid="category-notes">{notes}</div>;
  };
});

describe('MenuCategorySection', () => {
  it('renders the category section with title and items', () => {
    const category = {
      category_name: 'Appetizers',
      items: [
        { name: 'Samosa', description: 'Crispy pastry filled with spiced potatoes', price: '$8', is_vegetarian: true },
        { name: 'Chicken Tikka', description: 'Tender chicken marinated in spices', price: '$12', is_vegetarian: false },
      ],
    };
    
    render(<MenuCategorySection category={category} />);
    
    // Check if the category title is rendered
    expect(screen.getByText('Appetizers')).toBeInTheDocument();
    
    // Check if the menu items are rendered
    const itemNames = screen.getAllByTestId('item-name');
    expect(itemNames).toHaveLength(2);
    expect(itemNames[0]).toHaveTextContent('Samosa');
    expect(itemNames[1]).toHaveTextContent('Chicken Tikka');
    
    const itemDescriptions = screen.getAllByTestId('item-description');
    expect(itemDescriptions).toHaveLength(2);
    expect(itemDescriptions[0]).toHaveTextContent('Crispy pastry filled with spiced potatoes');
    expect(itemDescriptions[1]).toHaveTextContent('Tender chicken marinated in spices');
    
    const itemPrices = screen.getAllByTestId('item-price');
    expect(itemPrices).toHaveLength(2);
    expect(itemPrices[0]).toHaveTextContent('$8');
    expect(itemPrices[1]).toHaveTextContent('$12');
  });
  
  it('renders category notes when available', () => {
    const category = {
      category_name: 'Appetizers',
      category_notes: 'All appetizers are served with mint chutney.',
      items: [
        { name: 'Samosa', description: 'Crispy pastry filled with spiced potatoes', price: '$8', is_vegetarian: true },
      ],
    };
    
    render(<MenuCategorySection category={category} />);
    
    // Check if the category notes are rendered
    const categoryNotes = screen.getByTestId('category-notes');
    expect(categoryNotes).toBeInTheDocument();
    expect(categoryNotes).toHaveTextContent('All appetizers are served with mint chutney.');
  });
  
  it('does not render category notes when not available', () => {
    const category = {
      category_name: 'Appetizers',
      items: [
        { name: 'Samosa', description: 'Crispy pastry filled with spiced potatoes', price: '$8', is_vegetarian: true },
      ],
    };
    
    render(<MenuCategorySection category={category} />);
    
    // Check that category notes are not rendered
    expect(screen.queryByTestId('category-notes')).not.toBeInTheDocument();
  });
  
  it('has the correct grid layout for menu items', () => {
    const category = {
      category_name: 'Appetizers',
      items: [
        { name: 'Samosa', description: 'Crispy pastry filled with spiced potatoes', price: '$8', is_vegetarian: true },
        { name: 'Chicken Tikka', description: 'Tender chicken marinated in spices', price: '$12', is_vegetarian: false },
        { name: 'Paneer Tikka', description: 'Cottage cheese marinated in spices', price: '$10', is_vegetarian: true },
      ],
    };
    
    const { container } = render(<MenuCategorySection category={category} />);
    
    // Check if the menu items are in a grid layout
    const gridContainer = container.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    expect(gridContainer).toBeInTheDocument();
    
    // Check if there are 3 menu item cards
    const menuItemCards = screen.getAllByTestId('menu-item-card');
    expect(menuItemCards).toHaveLength(3);
  });
});
