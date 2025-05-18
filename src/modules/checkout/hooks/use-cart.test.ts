// Testing Framework: Jest
// Hook Testing Utility: @testing-library/react-hooks
import { renderHook, act } from '@testing-library/react-hooks';
import { useCart } from './use-cart';

describe('useCart hook', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('initializes with an empty cart', () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.items).toEqual([]);
    expect(result.current.totalQuantity).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('adds a product to the cart', () => {
    const { result } = renderHook(() => useCart());
    const product = { id: 'p1', name: 'Test Product', price: 10 };
    act(() => {
      result.current.addItem(product, 2);
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({ ...product, quantity: 2 });
    expect(result.current.totalQuantity).toBe(2);
    expect(result.current.totalPrice).toBe(20);
  });

  it('increments quantity when adding the same product again', () => {
    const { result } = renderHook(() => useCart());
    const product = { id: 'p1', name: 'Test Product', price: 5 };
    act(() => {
      result.current.addItem(product, 1);
    });
    act(() => {
      result.current.addItem(product, 3);
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(4);
    expect(result.current.totalQuantity).toBe(4);
    expect(result.current.totalPrice).toBe(20);
  });

  it('removes an item from the cart', () => {
    const { result } = renderHook(() => useCart());
    const product = { id: 'p2', name: 'Other Product', price: 15 };
    act(() => {
      result.current.addItem(product, 1);
    });
    act(() => {
      result.current.removeItem('p2');
    });
    expect(result.current.items).toEqual([]);
    expect(result.current.totalQuantity).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('updates the quantity of an item correctly', () => {
    const { result } = renderHook(() => useCart());
    const product = { id: 'p3', name: 'Edge Case', price: 20 };
    act(() => {
      result.current.addItem(product, 5);
    });
    act(() => {
      result.current.updateQuantity('p3', 2);
    });
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.totalQuantity).toBe(2);
    expect(result.current.totalPrice).toBe(40);
  });

  it('removes item when updating quantity to zero', () => {
    const { result } = renderHook(() => useCart());
    const product = { id: 'p3', name: 'Edge Case', price: 20 };
    act(() => {
      result.current.addItem(product, 1);
    });
    act(() => {
      result.current.updateQuantity('p3', 0);
    });
    expect(result.current.items).toEqual([]);
  });

  it('clears all items from the cart', () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem({ id: 'p4', name: 'A', price: 1 }, 2);
      result.current.addItem({ id: 'p5', name: 'B', price: 2 }, 3);
    });
    act(() => {
      result.current.clearCart();
    });
    expect(result.current.items).toEqual([]);
    expect(result.current.totalQuantity).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('does nothing when removing a non-existent item', () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.removeItem('nonexistent');
    });
    expect(result.current.items).toEqual([]);
  });

  it('does not add items with non-positive quantity', () => {
    const { result } = renderHook(() => useCart());
    const product = { id: 'p6', name: 'Invalid', price: 5 };
    act(() => {
      result.current.addItem(product, 0);
      result.current.addItem(product, -3);
    });
    expect(result.current.items).toEqual([]);
  });
});