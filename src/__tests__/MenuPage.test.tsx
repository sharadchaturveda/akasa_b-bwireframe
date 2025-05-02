import React from 'react';
import { render } from '@testing-library/react';
import MenuPage from '@/app/menu/page';

// Mock the MenuPageClient component
jest.mock('@/components/pages/MenuPageClient', () => {
  return function MockMenuPageClient() {
    return <div data-testid="menu-page-client">Menu Page Client Component</div>;
  };
});

describe('MenuPage', () => {
  it('renders the MenuPageClient component', () => {
    const { getByTestId } = render(<MenuPage />);
    
    // Check if the MenuPageClient component is rendered
    expect(getByTestId('menu-page-client')).toBeInTheDocument();
  });
});
