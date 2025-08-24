import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-menu-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-neutral-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-neutral-800 mb-4">قائمة الطعام</h2>
          <p class="text-xl text-neutral-600">اكتشف أشهى الأطباق المصرية الأصيلة</p>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            *ngFor="let category of categories" 
            (click)="selectedCategory = category"
            [class.bg-primary]="selectedCategory === category"
            [class.text-surface]="selectedCategory === category"
            [class.bg-white]="selectedCategory !== category"
            [class.text-neutral-700]="selectedCategory !== category"
            class="px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-primary hover:text-surface shadow-md">
            {{ category }}
          </button>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let item of filteredItems" 
               class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            
            <!-- Product Image -->
            <div class="relative">
              <img [src]="item.image" [alt]="item.name" 
                   class="w-full h-64 object-cover">
              
              <!-- Badges -->
              <div class="absolute top-4 right-4 flex flex-col gap-2">
                <span *ngIf="item.isNew" 
                      class="bg-accent text-neutral-800 px-3 py-1 rounded-full text-sm font-bold">
                  جديد
                </span>
                <span *ngIf="item.isPopular" 
                      class="bg-primary text-surface px-3 py-1 rounded-full text-sm font-bold">
                  الأكثر طلباً
                </span>
                <span *ngIf="item.discount" 
                      class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  خصم {{ item.discount }}%
                </span>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-6">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-xl font-bold text-neutral-800">{{ item.name }}</h3>
                <div class="text-left">
                  <span *ngIf="item.discount" class="text-sm text-neutral-500 line-through block">
                    {{ item.price }} جنيه
                  </span>
                  <span class="text-2xl font-bold text-primary">
                    {{ item.discount ? (item.price * (1 - item.discount/100)) : item.price }} جنيه
                  </span>
                </div>
              </div>
              
              <p class="text-neutral-600 mb-4 leading-relaxed">{{ item.description }}</p>
              
              <!-- Add to Cart Button -->
              <button class="w-full bg-primary text-surface py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"></path>
                </svg>
                أضف للسلة
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class MenuProductsComponent {
  selectedCategory = 'الكل';
  
  categories = ['الكل', 'المشويات', 'الفراخ', 'اللحوم', 'الأسماك', 'الحلويات', 'المشروبات'];

  menuItems: Product[] = [
    {
      id: 1,
      name: 'شيش طاووق مشوي',
      description: 'قطع دجاج مشوية على الفحم مع الأرز والصلصة',
      price: 120,
      originalPrice: 140,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (1).jpeg',
      category: 'مشويات',
      isNew: true,
      isPopular: true,
      available: true,
      rating: 4.8,
      preparationTime: '20-25 دقيقة',
      calories: 650,
      ingredients: ['دجاج', 'بهارات', 'ثوم', 'ليمون']
    },
    {
      id: 2,
      name: 'كباب حلة',
      description: 'لحم ضأن مشوي مع الأرز والسلطة',
      price: 135,
      originalPrice: 150,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (2).jpeg',
      category: 'مشويات',
      isPopular: true,
      discount: 10,
      available: true,
      rating: 4.9,
      preparationTime: '25-30 دقيقة',
      calories: 780,
      ingredients: ['لحم ضأن', 'بصل', 'بهارات مشكلة', 'طماطم']
    },
    {
      id: 3,
      name: 'شاورما دجاج',
      description: 'شاورما دجاج مع الثومية والخضار',
      price: 80,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (3).jpeg',
      category: 'ساندويتشات',
      isNew: true,
      available: true,
      rating: 4.7,
      preparationTime: '15-20 دقيقة',
      calories: 520,
      ingredients: ['صدر دجاج', 'ثومية', 'خس', 'طماطم', 'خيار']
    },
    {
      id: 4,
      name: 'برجر لحم',
      description: 'برجر لحم مشوي مع الجبن والخضار',
      price: 90,
      originalPrice: 100,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (5).jpeg',
      category: 'ساندويتشات',
      discount: 10,
      available: true,
      rating: 4.6,
      preparationTime: '15-20 دقيقة',
      calories: 680,
      ingredients: ['لحم بقري', 'جبنة شيدر', 'خس', 'طماطم', 'بصل']
    },
    {
      id: 5,
      name: 'سلطة سيزر',
      description: 'خس، كرنب، جبنة بارميزان، كروتون، صوص سيزر',
      price: 65,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (1).jpeg',
      category: 'سلطات',
      isNew: true,
      available: true,
      rating: 4.5,
      preparationTime: '10-15 دقيقة',
      calories: 320,
      ingredients: ['خس', 'كرنب', 'جبنة بارميزان', 'كروتون', 'صوص سيزر']
    },
    {
      id: 6,
      name: 'مشروب ليمون بالنعناع',
      description: 'ليمون طازج مع أوراق النعناع',
      price: 25,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (2).jpeg',
      category: 'مشروبات',
      available: true,
      rating: 4.8,
      preparationTime: '5 دقائق',
      calories: 120,
      ingredients: ['ليمون', 'نعناع طازج', 'سكر', 'ماء مثلج']
    }
  ];

  get filteredItems() {
    if (this.selectedCategory === 'الكل') {
      return this.menuItems;
    }
    return this.menuItems.filter(item => item.category === this.selectedCategory);
  }

  getDiscountPrice(price: number, discount?: number): number {
    if (!discount) return price;
    return Math.round(price * (1 - discount / 100));
  }
}
