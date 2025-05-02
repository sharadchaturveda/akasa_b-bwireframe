import React from 'react';
import { render, screen } from '@testing-library/react';
import ALaCarteMenuPage from '@/app/menu/a-la-carte/page';

// Mock the components
jest.mock('@/components/home/Navigation', () => {
  return function MockNavigation() {
    return <div data-testid="navigation">Navigation Component</div>;
  };
});

jest.mock('@/components/home/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer Component</div>;
  };
});

jest.mock('@/components/menu/MenuCategorySection', () => {
  return function MockMenuCategorySection({ category }) {
    return (
      <div data-testid="menu-category-section">
        <div data-testid="category-name">{category.category_name}</div>
      </div>
    );
  };
});

jest.mock('@/components/mobile/MobileMenuCategorySection', () => {
  return function MockMobileMenuCategorySection({ category }) {
    return (
      <div data-testid="mobile-menu-category-section">
        <div data-testid="category-name">{category.category_name}</div>
      </div>
    );
  };
});

// Mock the next/link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => {
    return <a href={href} data-testid="link-component">{children}</a>;
  },
}));

// Mock the button component
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, className }) => {
    return <button className={className} data-testid="button-component">{children}</button>;
  },
}));

// Mock the menu data
jest.mock('@/data/alacarteMenu', () => ({
  alacarteMenu: {
    categories: [
      {
        category_name: 'Appetizers',
        items: [
          { name: 'Samosa', description: 'Crispy pastry filled with spiced potatoes', price: '$8', is_vegetarian: true },
          { name: 'Chicken Tikka', description: 'Tender chicken marinated in spices', price: '$12', is_vegetarian: false },
        ],
      },
      {
        category_name: 'Main Courses',
        items: [
          { name: 'Butter Chicken', description: 'Chicken in a rich tomato sauce', price: '$18', is_vegetarian: false },
          { name: 'Palak Paneer', description: 'Cottage cheese in spinach gravy', price: '$16', is_vegetarian: true },
        ],
      },
    ],
  },
}));

// Mock the isMobileDevice function
jest.mock('@/utils/mobileUtils', () => ({
  isMobileDevice: jest.fn().mockReturnValue(false),
}));

describe('ALaCarteMenuPage', () => {
  // Mock document.querySelectorAll
  const originalQuerySelectorAll = document.querySelectorAll;
  
  beforeAll(() => {
    // Mock document.querySelectorAll
    document.querySelectorAll = jest.fn().mockReturnValue([]);
  });
  
  afterAll(() => {
    // Restore original method
    document.querySelectorAll = originalQuerySelectorAll;
  });
  
  it('renders the a la carte menu page with all components', () => {
    render(<ALaCarteMenuPage />);
    
    // Check if the navigation and footer are rendered
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    
    // Check if the page title is rendered
    expect(screen.getByText('À La Carte Menu')).toBeInTheDocument();
    
    // Check if the page description is rendered
    expect(screen.getByText('Our signature dishes available for individual selection')).toBeInTheDocument();
    
    // Check if the menu legend is rendered
    expect(screen.getByText('Vegetarian')).toBeInTheDocument();
    expect(screen.getByText('Non-Vegetarian')).toBeInTheDocument();
    
    // Check if the menu categories are rendered
    const categoryNames = screen.getAllByTestId('category-name');
    expect(categoryNames).toHaveLength(2);
    expect(categoryNames[0]).toHaveTextContent('Appetizers');
    expect(categoryNames[1]).toHaveTextContent('Main Courses');
    
    // Check if the back to menus button is rendered
    expect(screen.getByText('Back to All Menus')).toBeInTheDocument();
    
    // Check if the link has the correct href
    const backLink = screen.getByTestId('link-component');
    expect(backLink).toHaveAttribute('href', '/menu');
  });
  
  it('renders the desktop version when not on mobile', () => {
    render(<ALaCarteMenuPage />);
    
    // Check if the desktop menu category sections are rendered
    const menuCategorySections = screen.getAllByTestId('menu-category-section');
    expect(menuCategorySections).toHaveLength(2);
    
    // Check that the mobile menu category sections are not rendered
    expect(screen.queryByTestId('mobile-menu-category-section')).not.toBeInTheDocument();
  });
  
  it('renders the mobile version when on mobile', () => {
    // Mock isMobileDevice to return true
    require('@/utils/mobileUtils').isMobileDevice.mockReturnValue(true);
    
    render(<ALaCarteMenuPage />);
    
    // Check if the mobile menu category sections are rendered
    const mobileMenuCategorySections = screen.getAllByTestId('mobile-menu-category-section');
    expect(mobileMenuCategorySections).toHaveLength(2);
    
    // Check that the desktop menu category sections are not rendered
    expect(screen.queryByTestId('menu-category-section')).not.toBeInTheDocument();
    
    // Reset the mock
    require('@/utils/mobileUtils').isMobileDevice.mockReturnValue(false);
  });
  
  it('optimizes images on mount', () => {
    // Mock document.querySelectorAll to return some images
    const mockImages = [
      { complete: true, classList: { add: jest.fn() } },
      { complete: false, classList: { add: jest.fn() }, onload: null },
    ];
    
    document.querySelectorAll = jest.fn().mockReturnValue(mockImages);
    
    render(<ALaCarteMenuPage />);
    
    // Check if querySelectorAll was called for images
    expect(document.querySelectorAll).toHaveBeenCalledWith('img');
    
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
