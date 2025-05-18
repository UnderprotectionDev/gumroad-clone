describe('CartButton additional behaviors', () => {
  test('displays item count when itemCount > 0', () => {
    const mockHandler = jest.fn();
    render(<CartButton onAddToCart={mockHandler} itemCount={5} />);
    expect(screen.getByRole('button')).toHaveTextContent('Add more (5)');
  });

  test('calls onAddToCart when clicked', () => {
    const mockHandler = jest.fn();
    render(<CartButton onAddToCart={mockHandler} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  test('button is disabled when disabled prop is true', () => {
    const mockHandler = jest.fn();
    render(<CartButton onAddToCart={mockHandler} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('shows loading state when isLoading is true', () => {
    const mockHandler = jest.fn();
    render(<CartButton onAddToCart={mockHandler} isLoading />);
    expect(screen.getByRole('button')).toHaveTextContent('Adding...');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('handles negative itemCount gracefully', () => {
    const mockHandler = jest.fn();
    render(<CartButton onAddToCart={mockHandler} itemCount={-3} />);
    expect(screen.getByRole('button')).toHaveTextContent('Add to cart');
  });

  test('has proper aria-label for accessibility', () => {
    const mockHandler = jest.fn();
    render(<CartButton onAddToCart={mockHandler} />);
    expect(screen.getByLabelText('add to cart')).toBeInTheDocument();
  });
});