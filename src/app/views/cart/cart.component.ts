import { Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, type CartItem } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CurrencyPipe],
  template: `
    <div class="container mx-auto px-4 py-12">
      <!-- Page Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-neutral-800 mb-2">سلة التسوق</h1>
        <div class="w-20 h-1 bg-primary mx-auto"></div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Cart Items -->
        <div class="lg:w-2/3">
          <!-- Empty Cart State -->
          <div *ngIf="cartItems().length === 0" class="bg-white rounded-xl shadow-md p-8 text-center">
            <div class="text-6xl mb-4">🛒</div>
            <h2 class="text-2xl font-bold text-neutral-800 mb-2">سلة التسوق فارغة</h2>
            <p class="text-neutral-600 mb-6">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
            <a routerLink="/menu" class="inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
              تصفح القائمة
            </a>
          </div>

          <!-- Cart Items List -->
          <div *ngIf="cartItems().length > 0" class="space-y-4">
            <div *ngFor="let item of cartItems()" class="bg-white rounded-xl shadow-md overflow-hidden">
              <div class="flex flex-col md:flex-row">
                <!-- Item Image -->
                <div class="md:w-1/4 h-48 bg-gray-100">
                  <img [src]="item.image" [alt]="item.name" class="w-full h-full object-cover">
                </div>
                
                <!-- Item Details -->
                <div class="p-6 flex-1">
                  <div class="flex justify-between items-start">
                    <h3 class="text-xl font-bold text-neutral-800">{{ item.name }}</h3>
                    <button (click)="removeItem(item.id)" class="text-red-500 hover:text-red-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <p class="text-primary font-bold text-xl my-3">{{ item.price | currency:'EGP':'symbol':'1.0-0' }}</p>
                  
                  <!-- Quantity Controls -->
                  <div class="flex items-center mt-4">
                    <button (click)="updateQuantity(item.id, item.quantity - 1)" 
                            class="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-100">
                      <span class="text-xl">-</span>
                    </button>
                    
                    <input type="number" 
                           [(ngModel)]="item.quantity" 
                           (change)="updateQuantity(item.id, item.quantity)"
                           min="1"
                           class="w-16 h-10 text-center border-t border-b border-gray-300 outline-none">
                    
                    <button (click)="updateQuantity(item.id, item.quantity + 1)" 
                            class="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-100">
                      <span class="text-xl">+</span>
                    </button>
                    
                    <div class="mr-auto ml-6 text-lg font-medium">
                      الإجمالي: <span class="text-primary">{{ item.total | currency:'EGP':'symbol':'1.0-0' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div *ngIf="cartItems().length > 0" class="lg:w-1/3">
          <div class="bg-white rounded-xl shadow-md p-6 sticky top-4">
            <h3 class="text-xl font-bold text-neutral-800 mb-6 pb-4 border-b">ملخص الطلب</h3>
            
            <div class="space-y-4 mb-6">
              <div class="flex justify-between">
                <span>عدد العناصر:</span>
                <span class="font-medium">{{ itemCount() }}</span>
              </div>
              <div class="flex justify-between text-lg font-bold">
                <span>الإجمالي:</span>
                <span class="text-primary">{{ totalValue | currency:'EGP':'symbol':'1.0-0' }}</span>
              </div>
              <div class="pt-4 border-t">
                <div class="flex items-center gap-2 text-sm text-green-600 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span>شحن مجاني للطلبات فوق 200 جنيهاً</span>
                </div>
              </div>
            </div>
            
            <button (click)="checkout()" 
                    class="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">
              إتمام الشراء
            </button>
            
            <div class="mt-4 text-center">
              <a routerLink="/menu" class="text-primary hover:underline inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                متابعة التسوق
              </a>
            </div>
          </div>
          
          <div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="mr-3">
                <h3 class="text-sm font-medium text-yellow-800">ملاحظة هامة</h3>
                <div class="mt-2 text-sm text-yellow-700">
                  <p>سيتم تأكيد طلبك عبر الهاتف. يرجى التأكد من صحة رقم هاتفك.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: calc(100vh - 80px);
      background-color: #f9fafb;
    }
    
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    input[type=number] {
      -moz-appearance: textfield;
    }
  `]
})
export class CartComponent {
  private cartService = inject(CartService);
  
  cartItems = this.cartService.getCartItems();
  cartTotal = this.cartService.getCartTotalSignal();
  itemCount = this.cartService.getItemCount();
  
  // Calculate total based on items
  get totalValue(): number {
    return this.cartItems().reduce((sum, item) => sum + item.total, 0);
  }

  updateQuantity(itemId: number, quantity: number) {
    this.cartService.updateQuantity(itemId, quantity);
  }

  removeItem(itemId: number) {
    if (confirm('هل أنت متأكد من حذف هذا العنصر من السلة؟')) {
      this.cartService.removeFromCart(itemId);
    }
  }

  checkout() {
    // In a real app, this would navigate to checkout
    alert('سيتم إضافة صفحة الدفع قريباً. شكراً لتفهمك!');
  }
}
