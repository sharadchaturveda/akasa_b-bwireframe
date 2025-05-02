import React from 'react';
import { render, screen } from '@testing-library/react';
import ChefSection from '@/components/menu/ChefSection';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // Convert boolean props to strings
    const imgProps = { ...props };
    if (typeof imgProps.fill === 'boolean') imgProps.fill = imgProps.fill.toString();
    if (typeof imgProps.priority === 'boolean') imgProps.priority = imgProps.priority.toString();

    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...imgProps} data-testid={props.id || 'image-component'} />;
  },
}));

// Mock window.performance
const originalPerformance = window.performance;
const mockPerformanceMark = jest.fn();
const mockPerformanceMeasure = jest.fn();
const mockGetEntriesByName = jest.fn().mockReturnValue([{ duration: 100 }]);

describe('ChefSection', () => {
  beforeAll(() => {
    // Mock document.getElementById
    document.getElementById = jest.fn().mockImplementation((id) => {
      if (id === 'lcp-image') {
        return {
          complete: true,
          classList: {
            add: jest.fn(),
          },
        };
      }
      return null;
    });

    // Mock window.performance
    Object.defineProperty(window, 'performance', {
      value: {
        mark: mockPerformanceMark,
        measure: mockPerformanceMeasure,
        getEntriesByName: mockGetEntriesByName,
      },
      writable: true,
    });
  });

  afterAll(() => {
    // Restore original window.performance
    Object.defineProperty(window, 'performance', {
      value: originalPerformance,
      writable: true,
    });
  });

  it('renders the chef section with chef image and information', () => {
    render(<ChefSection />);

    // Check if the chef image is rendered with correct props
    const chefImage = screen.getByTestId('lcp-image');
    expect(chefImage).toBeInTheDocument();
    expect(chefImage).toHaveAttribute('src', '/images/menu/chef.jpg');
    expect(chefImage).toHaveAttribute('alt', 'Chef Akhilesh Pathak');

    // Check if the section title is rendered
    expect(screen.getByText('Meet Our Chef')).toBeInTheDocument();

    // Check if the chef description is rendered
    expect(screen.getByText(/Hailing from the vibrant culinary melting pot of Kolkata/)).toBeInTheDocument();
    expect(screen.getByText(/His philosophy is simple: respect the ingredients/)).toBeInTheDocument();

    // Check if the achievement badges are rendered
    expect(screen.getByText('Taste Guru')).toBeInTheDocument();
    expect(screen.getByText('Curry Architect')).toBeInTheDocument();
    expect(screen.getByText('Culinary Trendsetter')).toBeInTheDocument();
  });

  it('marks LCP loaded when the chef image is loaded', () => {
    render(<ChefSection />);

    // Check if performance mark was called for LCP loaded
    expect(mockPerformanceMark).toHaveBeenCalledWith('lcp-loaded');

    // Check if performance measure was called
    expect(mockPerformanceMeasure).toHaveBeenCalledWith(
      'time-to-lcp',
      'navigationStart',
      'lcp-loaded'
    );

    // Check if getEntriesByName was called
    expect(mockGetEntriesByName).toHaveBeenCalledWith('time-to-lcp');
  });
});
