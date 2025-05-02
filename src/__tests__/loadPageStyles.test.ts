import { loadPageStyles, preloadPageStyles } from '@/utils/loadPageStyles';

describe('loadPageStyles', () => {
  // Mock document methods
  const originalCreateElement = document.createElement;
  const mockCreateElement = jest.fn().mockReturnValue({
    rel: '',
    href: '',
    id: '',
    as: '',
  });

  const originalGetElementById = document.getElementById;
  const mockGetElementById = jest.fn().mockReturnValue(null);

  const originalAppendChild = document.head.appendChild;
  const mockAppendChild = jest.fn();

  beforeAll(() => {
    // Mock document methods
    document.createElement = mockCreateElement;
    document.getElementById = mockGetElementById;
    document.head.appendChild = mockAppendChild;
  });

  afterAll(() => {
    // Restore original methods
    document.createElement = originalCreateElement;
    document.getElementById = originalGetElementById;
    document.head.appendChild = originalAppendChild;
  });

  beforeEach(() => {
    // Reset mocks before each test
    mockCreateElement.mockClear();
    mockGetElementById.mockClear();
    mockAppendChild.mockClear();
  });

  it('loads page styles for a specific page', () => {
    loadPageStyles('home');

    // Check if getElementById was called with the correct ID
    expect(mockGetElementById).toHaveBeenCalledWith('page-styles-home');

    // Check if createElement was called to create a link element
    expect(mockCreateElement).toHaveBeenCalledWith('link');

    // Check if the link element was configured correctly
    const linkElement = mockCreateElement.mock.results[0].value;
    expect(linkElement.rel).toBe('stylesheet');
    expect(linkElement.href).toBe('/styles/home.css');
    expect(linkElement.id).toBe('page-styles-home');

    // Check if the link element was appended to the head
    expect(mockAppendChild).toHaveBeenCalledWith(linkElement);
  });

  it('does not load styles if they are already loaded', () => {
    // Mock getElementById to return an existing element
    mockGetElementById.mockReturnValueOnce({});

    loadPageStyles('home');

    // Check if getElementById was called with the correct ID
    expect(mockGetElementById).toHaveBeenCalledWith('page-styles-home');

    // Check that createElement and appendChild were not called
    expect(mockCreateElement).not.toHaveBeenCalled();
    expect(mockAppendChild).not.toHaveBeenCalled();
  });
});

describe('preloadPageStyles', () => {
  // Mock document methods
  const originalCreateElement = document.createElement;
  const mockCreateElement = jest.fn().mockReturnValue({
    rel: '',
    href: '',
    id: '',
    as: '',
  });

  const originalGetElementById = document.getElementById;
  const mockGetElementById = jest.fn().mockReturnValue(null);

  const originalAppendChild = document.head.appendChild;
  const mockAppendChild = jest.fn();

  beforeAll(() => {
    // Mock document methods
    document.createElement = mockCreateElement;
    document.getElementById = mockGetElementById;
    document.head.appendChild = mockAppendChild;
  });

  afterAll(() => {
    // Restore original methods
    document.createElement = originalCreateElement;
    document.getElementById = originalGetElementById;
    document.head.appendChild = originalAppendChild;
  });

  beforeEach(() => {
    // Reset mocks before each test
    mockCreateElement.mockClear();
    mockGetElementById.mockClear();
    mockAppendChild.mockClear();
  });

  it('preloads styles for multiple pages', () => {
    preloadPageStyles(['menu', 'events']);

    // Check if getElementById was called for each page
    expect(mockGetElementById).toHaveBeenCalledWith('preload-styles-menu');
    expect(mockGetElementById).toHaveBeenCalledWith('preload-styles-events');

    // Check if createElement was called twice (once for each page)
    expect(mockCreateElement).toHaveBeenCalledTimes(2);

    // Check if the link elements were configured correctly
    const linkElements = mockCreateElement.mock.results;

    // Check that we have two link elements
    expect(linkElements.length).toBe(2);

    // Check that both link elements have the correct properties
    linkElements.forEach((result) => {
      const linkElement = result.value;
      expect(linkElement.rel).toBe('preload');
      expect(linkElement.as).toBe('style');

      // Check that the href contains a page name and ends with .css
      expect(linkElement.href).toMatch(/\/styles\/[a-z-]+\.css$/);
      expect(linkElement.id).toMatch(/^preload-styles-[a-z-]+$/);
    });

    // Check if the link elements were appended to the head
    expect(mockAppendChild).toHaveBeenCalledTimes(2);
    linkElements.forEach(result => {
      expect(mockAppendChild).toHaveBeenCalledWith(result.value);
    });
  });

  it('does not preload styles if they are already preloaded', () => {
    // Mock getElementById to return an existing element for the first page
    mockGetElementById.mockReturnValueOnce({});

    preloadPageStyles(['menu', 'events']);

    // Check if getElementById was called for each page
    expect(mockGetElementById).toHaveBeenCalledWith('preload-styles-menu');
    expect(mockGetElementById).toHaveBeenCalledWith('preload-styles-events');

    // Check if createElement was called only once (for the second page)
    expect(mockCreateElement).toHaveBeenCalledTimes(1);

    // Check if the link element was configured correctly for the second page
    const linkElement = mockCreateElement.mock.results[0].value;
    expect(linkElement.rel).toBe('preload');
    expect(linkElement.as).toBe('style');
    expect(linkElement.href).toBe('/styles/events.css');
    expect(linkElement.id).toBe('preload-styles-events');

    // Check if only one link element was appended to the head
    expect(mockAppendChild).toHaveBeenCalledTimes(1);
    expect(mockAppendChild).toHaveBeenCalledWith(linkElement);
  });
});
