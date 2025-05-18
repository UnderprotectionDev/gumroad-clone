import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutButton from './checkout-button';

describe('CheckoutButton', () => {
  test('renders default label when no label prop is provided', () => {
    const handleClick = jest.fn();
    render(<CheckoutButton onClick={handleClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Checkout');
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'false');
  });

  test('renders custom label when label prop is provided', () => {
    const handleClick = jest.fn();
    render(<CheckoutButton onClick={handleClick} label="Pay Now" />);
    expect(screen.getByRole('button')).toHaveTextContent('Pay Now');
  });

  test('shows loading state and disables button when isLoading is true', () => {
    const handleClick = jest.fn();
    render(<CheckoutButton onClick={handleClick} isLoading />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Processing...');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  test('disables the button when disabled prop is true', () => {
    const handleClick = jest.fn();
    render(<CheckoutButton onClick={handleClick} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'false');
  });

  test('prioritizes loading state over disabled state', () => {
    const handleClick = jest.fn();
    render(<CheckoutButton onClick={handleClick} disabled isLoading />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Processing...');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  test('calls onClick handler when clicked and not disabled or loading', () => {
    const handleClick = jest.fn();
    render(<CheckoutButton onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when button is disabled or loading', () => {
    const handleClick = jest.fn();
    render(<CheckoutButton onClick={handleClick} disabled />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();

    render(<CheckoutButton onClick={handleClick} isLoading />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('toggles aria-busy based on isLoading prop', () => {
    const handleClick = jest.fn();
    render(<CheckoutButton onClick={handleClick} isLoading={false} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'false');
    render(<CheckoutButton onClick={handleClick} isLoading />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});