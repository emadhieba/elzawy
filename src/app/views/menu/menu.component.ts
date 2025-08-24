import { Component, inject, signal } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  total: number;
}

interface MenuItem extends Omit<Product, 'available'> {
  isNew?: boolean;
  isPopular?: boolean;
  preparationTime?: string;
  calories?: number;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ],
  template: `
    <div class="container mx-auto px-4 py-8 animate-fadeIn">
      <!-- Category Filter -->
      <div class="mb-12 text-center">
        <h2 class="text-3xl font-bold mb-6 text-gray-800">قائمة الطعام</h2>
        <div class="flex flex-wrap gap-3 justify-center">
          <button 
            *ngFor="let category of categories"
            (click)="filterByCategory(category)"
            [class.bg-primary-600]="selectedCategory === category"
            [class.text-white]="selectedCategory === category"
            [class.bg-gray-100]="selectedCategory !== category"
            [class.hover:bg-primary-500]="selectedCategory !== category"
            [class.hover:text-white]="selectedCategory !== category"
            class="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Menu Items Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div 
          *ngFor="let item of filteredItems" 
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border border-gray-100"
        >
          <!-- Product Image -->
          <div class="relative h-48 bg-gray-100 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
            <img 
              [src]="item.image" 
              [alt]="item.name"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              (error)="handleImageError($event)"
            >
            
            <!-- Badges -->
            <div class="absolute top-3 right-3 flex flex-col gap-2 z-20">
              <span *ngIf="item.isNew" class="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                🆕 جديد
              </span>
              <span *ngIf="item.isPopular" class="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                ⭐ الأكثر مبيعاً
              </span>
              <span *ngIf="item.discount" class="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                🎉 خصم {{ item.discount }}%
              </span>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-5 flex flex-col flex-grow">
            <div class="flex-grow">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ item.name }}</h3>
              <p class="text-gray-600 text-sm mb-3 line-clamp-2 h-10">{{ item.description }}</p>
              
              <!-- Product Details -->
              <div class="flex items-center gap-3 text-xs text-gray-500 mb-4">
                <span *ngIf="item.preparationTime" class="flex items-center">
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ item.preparationTime }}
                </span>
                <span *ngIf="item.calories" class="flex items-center">
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  {{ item.calories }} سعرة
                </span>
              </div>
            </div>
            
            <!-- Price & Add to Cart -->
            <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div class="flex items-baseline gap-2">
                <span class="text-xl font-bold text-primary-600">
                  {{ getPriceAfterDiscount(item) }} ج.م
                </span>
                <span *ngIf="item.discount" class="text-sm text-gray-400 line-through">
                  {{ item.originalPrice || item.price }} ج.م
                </span>
              </div>

              <!-- Add to Cart Button -->
              <button
                (click)="$event.stopPropagation(); addToCart(item)"
                [disabled]="isAddingToCart"
                class="group relative overflow-hidden bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 min-w-[120px] justify-center"
                [class.cursor-not-allowed]="isAddingToCart"
              >
                <!-- Default State -->
                <span *ngIf="!isAddingToCart" class="flex items-center gap-1 transition-all duration-300 group-hover:scale-105">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span class="hidden sm:inline">أضف للسلة</span>
                </span>
                
                <!-- Loading State -->
                <span *ngIf="isAddingToCart" class="absolute inset-0 flex items-center justify-center bg-primary-700">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                
                <!-- Success Checkmark (shown after adding) -->
                <span *ngIf="showSuccessMessage && !isAddingToCart" class="absolute inset-0 flex items-center justify-center bg-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Message Toast -->
    <div 
      *ngIf="showSuccessMessage"
      @fadeInOut
      class="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 z-50 max-w-sm"
    >
      <div class="flex-shrink-0">
        <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <div>
        <p class="font-medium">تمت الإضافة بنجاح!</p>
        <p class="text-sm opacity-90">تمت إضافة المنتج إلى سلة التسوق</p>
      </div>
      <button 
        (click)="showSuccessMessage = false"
        class="ml-4 text-white/80 hover:text-white focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f9fafb;
    }
  `]
})
export class MenuComponent {
  private cartService = inject(CartService);
  private router = inject(Router);

  // Menu data with sample products
  menuItems: MenuItem[] = [
    // وجبات
    {
      id: 1,
      name: 'برجر لحم مشوي',
      description: 'برجر لحم مشوي مع جبنة شيدر وخس وطماطم',
      price: 65,
      originalPrice: 75,
      discount: 13,
      category: 'وجبات',
      image: 'assets/images/menu/burger.jpg',
      isNew: true,
      isPopular: true,
      calories: 750,
      preparationTime: '15 دقيقة'
    },
    {
      id: 2,
      name: 'بيتزا مارجريتا',
      description: 'عجينة رقيقة مع صوص الطماطم وجبنة الموزاريلا',
      price: 85,
      category: 'وجبات',
      image: 'assets/images/menu/pizza.jpg',
      isPopular: true,
      calories: 920,
      preparationTime: '20 دقيقة'
    },
    {
      id: 5,
      name: 'ساندويتش شاورما دجاج',
      description: 'شاورما دجاج مع ثومية وخضار',
      price: 45,
      originalPrice: 52,
      discount: 13,
      category: 'وجبات',
      image: 'assets/images/menu/chicken-shawarma.jpg',
      isPopular: true,
      calories: 680,
      preparationTime: '12 دقيقة'
    },
    {
      id: 7,
      name: 'برجر دجاج مقرمش',
      description: 'برجر دجاج مقرمش مع المايونيز والخس',
      price: 55,
      category: 'وجبات',
      image: 'assets/images/menu/chicken-burger.jpg',
      calories: 620,
      preparationTime: '12 دقيقة'
    },
    
    // مشروبات
    {
      id: 3,
      name: 'مشروب المانجو',
      description: 'عصير مانجو طازج مع قطع المانجو',
      price: 25,
      originalPrice: 30,
      discount: 16,
      category: 'مشروبات',
      image: 'assets/images/menu/mango-juice.jpg',
      isNew: true,
      calories: 180,
      preparationTime: '5 دقائق'
    },
    {
      id: 8,
      name: 'ميلك شيك شوكولاتة',
      description: 'ميلك شيك بالشوكولاتة والآيس كريم',
      price: 35,
      category: 'مشروبات',
      image: 'assets/images/menu/chocolate-milkshake.jpg',
      calories: 420,
      preparationTime: '7 دقائق',
      isPopular: true
    },
    {
      id: 9,
      name: 'كابتشينو بارد',
      description: 'قهوة إسبريسو مع الحليب المبخر والرغوة',
      price: 30,
      category: 'مشروبات',
      image: 'assets/images/menu/iced-cappuccino.jpg',
      calories: 120,
      preparationTime: '5 دقائق'
    },
    
    // حلويات
    {
      id: 4,
      name: 'كنافة بالنوتيلا',
      description: 'كنافة هشة مع حشوة نوتيلا وجوز',
      price: 45,
      category: 'حلويات',
      image: 'assets/images/menu/nutella-kanafeh.jpg',
      calories: 480,
      preparationTime: '10 دقائق'
    },
    {
      id: 10,
      name: 'تشيز كيك توت',
      description: 'تشيز كيك كريمي مع توت طازج',
      price: 50,
      originalPrice: 60,
      discount: 16,
      category: 'حلويات',
      image: 'assets/images/menu/berry-cheesecake.jpg',
      isNew: true,
      calories: 380,
      preparationTime: '8 دقائق'
    },
    
    // مقبلات
    {
      id: 6,
      name: 'سبرنغ رول',
      description: 'سبرنغ رول مقرمش مع خضار مشكلة',
      price: 35,
      category: 'مقبلات',
      image: 'assets/images/menu/spring-rolls.jpg',
      isNew: true,
      calories: 320,
      preparationTime: '10 دقائق'
    },
    {
      id: 11,
      name: 'بطاطس بوفتيك',
      description: 'شرائح بطاطس مقلية مع توابل خاصة',
      price: 25,
      category: 'مقبلات',
      image: 'assets/images/menu/buffalo-fries.jpg',
      calories: 420,
      preparationTime: '8 دقائق'
    }
  ];
  
  categories: string[] = ['الكل', 'وجبات', 'مشروبات', 'حلويات', 'مقبلات'];
  selectedCategory = 'الكل';
  
  // UI State
  isAddingToCart = false;
  showSuccessMessage = false;
  defaultImage = 'assets/images/food-placeholder.jpg';

  // Filter items by selected category
  get filteredItems() {
    if (this.selectedCategory === 'الكل') {
      return this.menuItems;
    }
    return this.menuItems.filter(item => item.category === this.selectedCategory);
  }

  // Calculate price after applying discount
  getPriceAfterDiscount(item: MenuItem): number {
    if (item.discount && item.discount > 0) {
      return item.price - (item.price * item.discount / 100);
    }
    return item.price;
  }

  // Filter menu items by category
  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }

  // Add item to cart
  async addToCart(item: MenuItem): Promise<void> {
    if (this.isAddingToCart) return;
    
    this.isAddingToCart = true;
    this.showSuccessMessage = false;
    
    try {
      // Simulate API call delay
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
      // Create cart item without quantity and total - they will be set by the cart service
      const cartItem = {
        id: item.id,
        name: item.name,
        price: this.getPriceAfterDiscount(item),
        image: item.image
      };
      
      // Add to cart
      this.cartService.addToCart(cartItem);
      
      // Show success message
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
      
    } finally {
      this.isAddingToCart = false;
    }
  }

  // TODO: Load menu items from a service
  private loadMenuItems(): void {
    // This should be replaced with an actual API call
    this.menuItems = [
      {
        id: 1,
        name: 'برجر لحم',
        description: 'برجر لحم مشوي مع جبنة شيدر وخس وطماطم',
        price: 45,
        originalPrice: 55,
        discount: 10,
        category: 'وجبات',
        image: 'assets/images/burger.jpg',
        isNew: true,
        isPopular: true,
        calories: 650,
        preparationTime: '15 دقيقة'
      },
      // Add more menu items here
    ];
  }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  handleImageError(event: any): void {
    event.target.src = this.defaultImage;
  }
}
