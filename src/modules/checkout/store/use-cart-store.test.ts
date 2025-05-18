import { describe, it, expect, beforeEach } from '@jest/globals'
import { useCartStore, CartItem } from './use-cart-store'

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.setState(
      { items: [], totalQuantity: 0, totalPrice: 0 },
      true
    )
  })

  it('starts with an empty cart', () => {
    const { items, totalQuantity, totalPrice } = useCartStore.getState()
    expect(items).toEqual([])
    expect(totalQuantity).toBe(0)
    expect(totalPrice).toBe(0)
  })

  it('adds an item and updates totals correctly', () => {
    const newItem: CartItem = { id: 'sku123', name: 'Test Product', price: 10, quantity: 2 }
    useCartStore.getState().addItem(newItem)
    const { items, totalQuantity, totalPrice } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual(newItem)
    expect(totalQuantity).toBe(2)
    expect(totalPrice).toBe(20)
  })

  it('increments quantity when same item is added again', () => {
    const item: CartItem = { id: 'sku123', name: 'Test', price: 5, quantity: 1 }
    useCartStore.getState().addItem(item)
    useCartStore.getState().addItem(item)
    const state = useCartStore.getState()
    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(2)
    expect(state.totalQuantity).toBe(2)
    expect(state.totalPrice).toBe(10)
  })

  it('removes an existing item from the cart', () => {
    const item: CartItem = { id: 'sku123', name: 'X', price: 3, quantity: 1 }
    useCartStore.getState().addItem(item)
    useCartStore.getState().removeItem('sku123')
    const { items, totalQuantity, totalPrice } = useCartStore.getState()
    expect(items).toEqual([])
    expect(totalQuantity).toBe(0)
    expect(totalPrice).toBe(0)
  })

  it('does nothing when removing an item not in the cart', () => {
    useCartStore.getState().removeItem('unknown-id')
    expect(useCartStore.getState().items).toEqual([])
  })

  it('updates item quantity correctly', () => {
    const item: CartItem = { id: 'sku1', name: 'A', price: 2, quantity: 1 }
    useCartStore.getState().addItem(item)
    useCartStore.getState().updateItemQuantity('sku1', 5)
    const { items, totalQuantity, totalPrice } = useCartStore.getState()
    expect(items[0].quantity).toBe(5)
    expect(totalQuantity).toBe(5)
    expect(totalPrice).toBe(10)
  })

  it('removes item when quantity is set to zero', () => {
    const item: CartItem = { id: 'sku2', name: 'B', price: 4, quantity: 2 }
    useCartStore.getState().addItem(item)
    useCartStore.getState().updateItemQuantity('sku2', 0)
    expect(useCartStore.getState().items).toEqual([])
  })

  it('ignores update when quantity is negative', () => {
    const item: CartItem = { id: 'sku3', name: 'C', price: 1, quantity: 1 }
    useCartStore.getState().addItem(item)
    useCartStore.getState().updateItemQuantity('sku3', -5)
    expect(useCartStore.getState().items[0].quantity).toBe(1)
  })

  it('clears the cart and resets totals', () => {
    const items: CartItem[] = [
      { id: 'a', name: 'A', price: 2, quantity: 1 },
      { id: 'b', name: 'B', price: 3, quantity: 2 },
    ]
    items.forEach(i => useCartStore.getState().addItem(i))
    useCartStore.getState().clearCart()
    const { items: finalItems, totalQuantity, totalPrice } = useCartStore.getState()
    expect(finalItems).toEqual([])
    expect(totalQuantity).toBe(0)
    expect(totalPrice).toBe(0)
  })
})