import { Injectable, signal } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  private cartTotal = signal<number>(0);
  private itemCount = signal<number>(0);

  constructor() { 
    this.loadCart();
  }

  // Public methods
  getCartItems() {
    return this.cartItems.asReadonly();
  }

  getCartTotal() {
    return this.cartItems().reduce((total, item) => total + item.total, 0);
  }

  getCartTotalSignal() {
    return this.cartTotal.asReadonly();
  }

  getItemCount() {
    return this.itemCount.asReadonly();
  }

  addToCart(item: Omit<CartItem, 'quantity' | 'total'>) {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(i => i.id === item.id);

    if (existingItem) {
      this.updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      const newItem: CartItem = {
        ...item,
        quantity: 1,
        total: item.price
      };
      this.cartItems.update(items => [...items, newItem]);
      this.updateCartState();
    }
  }
  
  // Alias for addToCart to maintain backward compatibility
  addItem(item: Omit<CartItem, 'quantity' | 'total'>) {
    this.addToCart(item);
  }
  
  updateQuantity(itemId: number, quantity: number) {
    if (quantity < 1) {
      this.removeFromCart(itemId);
      return;
    }

    this.cartItems.update(items => 
      items.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              quantity,
              total: item.price * quantity 
            } 
          : item
      )
    );
    this.updateCartState();
  }

  removeFromCart(itemId: number) {
    this.cartItems.update(items => items.filter(item => item.id !== itemId));
    this.updateCartState();
  }

  clearCart() {
    this.cartItems.set([]);
    this.updateCartState();
  }
  
  // Private methods
  private updateCartState() {
    const items = this.cartItems();
    const total = items.reduce((sum, item) => sum + item.total, 0);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    
    this.cartTotal.set(total);
    this.itemCount.set(count);
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  private loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        this.cartItems.set(items);
        this.updateCartState();
      } catch (e) {
        console.error('Error loading cart', e);
        this.clearCart();
      }
    }
  }
}
