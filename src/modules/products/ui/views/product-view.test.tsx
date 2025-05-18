// Testing framework: Jest
// Test utilities: React Testing Library and user-event

import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductView, { formatPrice, calculateDiscount } from './product-view'

const sampleProduct = {
  id: '1',
  name: 'Test Product',
  description: 'A test product description.',
  price: 19.99,
  imageUrl: '/test-image.png',
  stockQuantity: 10,
}

let onAddToCartMock: jest.Mock

beforeEach(() => {
  onAddToCartMock = jest.fn()
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('ProductView Component', () => {
  it('renders product details correctly', () => {
    render(<ProductView product={sampleProduct} onAddToCart={onAddToCartMock} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('A test product description.')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', '/test-image.png')
    expect(screen.getByText(formatPrice(19.99))).toBeInTheDocument()
    const addButton = screen.getByRole('button', { name: /add to cart/i })
    expect(addButton).toBeEnabled()
  })

  it('disables Add to Cart button when out of stock', () => {
    const outOfStock = { ...sampleProduct, stockQuantity: 0 }
    render(<ProductView product={outOfStock} onAddToCart={onAddToCartMock} />)
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeDisabled()
  })

  it('calls onAddToCart with correct product when clicked', async () => {
    render(<ProductView product={sampleProduct} onAddToCart={onAddToCartMock} />)
    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }))
    expect(onAddToCartMock).toHaveBeenCalledWith(sampleProduct)
  })

  it('renders loading indicator when isLoading is true', () => {
    render(<ProductView isLoading />)
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()
  })

  it('renders error message when error prop is provided', () => {
    render(<ProductView error="Failed to load product" />)
    expect(screen.getByText(/failed to load product/i)).toBeInTheDocument()
  })

  it('renders placeholder image when imageUrl is missing', () => {
    const noImage = { ...sampleProduct, imageUrl: '' }
    render(<ProductView product={noImage} onAddToCart={onAddToCartMock} />)
    expect(screen.getByRole('img')).toHaveAttribute('src', 'placeholder.png')
  })

  it('matches snapshot for default product', () => {
    const { container } = render(<ProductView product={sampleProduct} onAddToCart={onAddToCartMock} />)
    expect(container).toMatchSnapshot()
  })
})

describe('formatPrice Utility', () => {
  it('formats a positive number with two decimals and comma separators', () => {
    expect(formatPrice(1234.5)).toBe('$1,234.50')
  })

  it('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })

  it('formats negative numbers correctly', () => {
    expect(formatPrice(-5.5)).toBe('-$5.50')
  })
})

describe('calculateDiscount Utility', () => {
  it('calculates a 10% discount correctly', () => {
    expect(calculateDiscount(100, 0.1)).toBe(90)
  })

  it('returns original price when discount is zero', () => {
    expect(calculateDiscount(50, 0)).toBe(50)
  })

  it('handles full discount (100%) correctly', () => {
    expect(calculateDiscount(80, 1)).toBe(0)
  })
})