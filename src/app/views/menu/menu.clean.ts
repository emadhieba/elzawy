import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  total?: number;
}

interface MenuItem extends Omit<Product, 'available' | 'originalPrice' | 'discount' | 'isNew' | 'isPopular' | 'rating' | 'ingredients'> {
  available: boolean;
  originalPrice?: number;
  isNew?: boolean;
  isPopular?: boolean;
  rating?: number;
  preparationTime?: string;
  calories?: number;
  ingredients?: string[];
  discount?: number;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-8">قائمة الطعام</h1>
      
      <!-- Category Filter -->
      <div class="mb-8 flex justify-center gap-4 flex-wrap">
        <button 
          *ngFor="let category of categories"
          (click)="filterByCategory(category)"
          [class.bg-primary]="selectedCategory === category"
          [class.text-white]="selectedCategory === category"
          [class.bg-gray-100]="selectedCategory !== category"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        >
          {{ category }}
        </button>
      </div>
      
      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          *ngFor="let item of filteredItems"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img 
            [src]="item.image" 
            [alt]="item.name"
            class="w-full h-48 object-cover"
          />
          
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-semibold">{{ item.name }}</h3>
              <div class="flex gap-2">
                <span *ngIf="item.isNew" class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  جديد
                </span>
                <span *ngIf="item.isPopular" class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  الأكثر طلباً
                </span>
              </div>
            </div>
            
            <p class="text-gray-600 text-sm mb-3">{{ item.description }}</p>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-lg font-bold text-primary">
                  {{ item.discount ? getDiscountPrice(item.price, item.discount) : item.price }} ر.س
                </span>
                <span *ngIf="item.discount" class="text-sm text-gray-500 line-through">
                  {{ item.price }} ر.س
                </span>
                <span *ngIf="item.discount" class="text-sm text-red-500 bg-red-100 px-2 py-0.5 rounded-full">
                  خصم {{ item.discount }}%
                </span>
              </div>
              
              <button 
                (click)="addToCart(item)"
                [disabled]="isAddingToCart || !item.available"
                [class.opacity-50]="isAddingToCart || !item.available"
                class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
              >
                <span *ngIf="isAddingToCart" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                {{ isAddingToCart ? 'جاري الإضافة...' : 'أضف إلى السلة' }}
              </button>
            </div>
            
            <!-- Additional Info -->
            <div class="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
              <div class="flex items-center gap-4">
                <span *ngIf="item.rating" class="flex items-center">
                  <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  {{ item.rating }}
                </span>
                <span *ngIf="item.preparationTime">
                  <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ item.preparationTime }}
                </span>
                <span *ngIf="item.calories">
                  <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  {{ item.calories }} سعرة
                </span>
              </div>
              
              <div *ngIf="item.ingredients?.length" class="mt-2">
                <p class="font-medium text-gray-700">المكونات:</p>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span *ngFor="let ing of item.ingredients" class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {{ ing }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div *ngIf="filteredItems.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <h3 class="mt-2 text-lg font-medium text-gray-900">لا توجد عناصر متاحة</h3>
        <p class="mt-1 text-gray-500">لا توجد عناصر متاحة في هذا القسم حالياً.</p>
      </div>
      
      <!-- Success Message -->
      <div *ngIf="showSuccessMessage" class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>تمت إضافة المنتج إلى السلة بنجاح</span>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f9fafb;
    }
    
    .bg-primary {
      background-color: #3b82f6;
    }
    
    .bg-primary-dark {
      background-color: #2563eb;
    }
    
    .text-primary {
      color: #3b82f6;
    }
    
    .animate-spin {
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class MenuComponent {
  private cartService = inject(CartService);
  private router = inject(Router);
  
  categories = ['الكل', 'وجبات', 'مشروبات', 'حلويات', 'مقبلات'];
  selectedCategory = 'الكل';
  isAddingToCart = false;
  showSuccessMessage = false;
  
  // Sample data - replace with your actual data source
  menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'برجر لحم مشوي',
      description: 'برجر لحم مشوي مع جبنة شيدر وخس وطماطم',
      price: 25,
      originalPrice: 30,
      image: 'assets/images/burger.jpg',
      available: true,
      isNew: true,
      isPopular: true,
      rating: 4.5,
      preparationTime: '20 دقيقة',
      calories: 650,
      ingredients: ['لحم بقري', 'خس', 'طماطم', 'بصل', 'مخلل'],
      discount: 17,
      category: 'وجبات'
    },
    // Add more menu items here
  ];
  
  get filteredItems() {
    if (this.selectedCategory === 'الكل') {
      return this.menuItems;
    }
    return this.menuItems.filter(item => item.category === this.selectedCategory);
  }
  
  filterByCategory(category: string) {
    this.selectedCategory = category;
  }
  
  getDiscountPrice(price: number, discount: number): number {
    return Math.round(price * (1 - discount / 100));
  }
  
  async addToCart(item: MenuItem) {
    if (this.isAddingToCart) return;
    
    this.isAddingToCart = true;
    
    try {
      const price = item.discount 
        ? this.getDiscountPrice(item.price, item.discount)
        : item.price;
      
      this.cartService.addToCart({
        id: item.id,
        name: item.name,
        price: price,
        image: item.image
      });
      
      // Show success message
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
      
      // Navigate to cart after a short delay
      setTimeout(() => {
        this.router.navigate(['/cart']);
      }, 1000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Show error message to user
    } finally {
      this.isAddingToCart = false;
    }
  }
}
