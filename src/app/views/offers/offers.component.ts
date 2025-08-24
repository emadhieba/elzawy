import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offer } from '../../models/offer.model';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-5xl font-bold text-neutral-800 mb-4">العروض الخاصة</h2>
          <p class="text-xl text-neutral-600">وفر أكثر مع عروضنا المميزة لفترة محدودة</p>
        </div>

        <!-- Featured Offer -->
        <div class="mb-16">
          <div class="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 text-surface shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -translate-y-16 translate-x-16"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-surface/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div class="inline-block bg-accent text-neutral-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  عرض اليوم المميز
                </div>
                <h3 class="text-4xl font-bold mb-4">{{ featuredOffer.title }}</h3>
                <p class="text-xl mb-6 opacity-90">{{ featuredOffer.description }}</p>
                <div class="flex items-center gap-4 mb-6">
                  <span class="text-3xl font-bold">{{ featuredOffer.discountPrice }} ج.م</span>
                  <span class="text-xl line-through opacity-70">{{ featuredOffer.originalPrice }} ج.م</span>
                  <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    وفر {{ featuredOffer.discount }}%
                  </span>
                </div>
                <button class="bg-accent text-neutral-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition-colors duration-300">
                  اطلب الآن
                </button>
              </div>
              <div class="text-center">
                <img [src]="featuredOffer.image" [alt]="featuredOffer.title" 
                     class="w-full max-w-md mx-auto rounded-2xl shadow-lg">
              </div>
            </div>
          </div>
        </div>

        <!-- Offers Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let offer of offers" 
               class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="relative">
              <img [src]="offer.image" [alt]="offer.title" class="w-full h-48 object-cover">
              <div *ngIf="offer.isLimited" class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                محدود الكمية
              </div>
              <div class="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                خصم {{ offer.discount }}%
              </div>
              <div *ngIf="offer.validUntil" class="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-2 text-center">
                صالح حتى {{ offer.validUntil }}
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-neutral-800 mb-2">{{ offer.title }}</h3>
              <p class="text-neutral-600 mb-4">{{ offer.description }}</p>
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-2xl font-bold text-primary">{{ offer.discountPrice }} ج.م</span>
                  <span class="text-sm line-through text-neutral-500 mr-2">{{ offer.originalPrice }} ج.م</span>
                </div>
                <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200">
                  أضف إلى السلة
                </button>
              </div>
              <div *ngIf="offer.isLimited && offer.itemsLeft" class="mt-4">
                <div class="text-sm text-neutral-600 mb-1">
                  متبقي {{ offer.itemsLeft }} فقط
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-red-500 h-2 rounded-full" [style.width.%]="(offer.itemsLeft / 15) * 100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Newsletter Section -->
        <div class="mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold text-neutral-800 mb-2">اشترك في نشرتنا البريدية</h3>
            <p class="text-neutral-600">احصل على أحدث العروض والتخفيضات مباشرة إلى بريدك الإلكتروني</p>
          </div>
          <div class="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input type="email" placeholder="البريد الإلكتروني" 
                   class="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <button class="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200">
              اشتراك
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class OffersComponent {
  offers: Offer[] = [
    {
      id: 1,
      title: 'وجبة عائلية كاملة',
      description: 'فرختين مشويتين + كيلو أرز + سلطة كبيرة + مشروبات',
      originalPrice: 280,
      discountPrice: 199,
      discount: 29,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (1).jpeg',
      validUntil: '2025-12-31',
      isLimited: true,
      itemsLeft: 12
    },
    {
      id: 2,
      title: 'برجر لحم مشوي',
      description: 'برجر لحم مشوي مع جبنة شيدر وشرائح بصل',
      originalPrice: 120,
      discountPrice: 89,
      discount: 26,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (2).jpeg',
      validUntil: '2025-11-30',
      isLimited: true,
      itemsLeft: 8
    },
    {
      id: 3,
      title: 'بيتزا لحم مشوي كبيرة',
      description: 'بيتزا لحم مشوي مع فطر وجبنة موزاريلا',
      originalPrice: 160,
      discountPrice: 129,
      discount: 19,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (3).jpeg',
      validUntil: '2025-12-15'
    },
    {
      id: 4,
      title: 'ساندويتش شاورما دجاج',
      description: 'شاورما دجاج مشوية مع ثومية وخضار طازجة',
      originalPrice: 65,
      discountPrice: 49,
      discount: 25,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (5).jpeg',
      validUntil: '2025-12-31',
      isLimited: true,
      itemsLeft: 5
    },
    {
      id: 5,
      title: 'سناك دجاج',
      description: 'قطع دجاج مقرمشة مع صوص حار',
      originalPrice: 55,
      discountPrice: 39,
      discount: 29,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (1).jpeg',
      validUntil: '2025-11-30'
    },
    {
      id: 6,
      title: 'ساندويتش برجر دجاج',
      description: 'برجر دجاج مشوي مع خس وطماطم',
      originalPrice: 70,
      discountPrice: 55,
      discount: 21,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (2).jpeg',
      validUntil: '2025-12-31',
      isLimited: true,
      itemsLeft: 15
    }
  ];

  get featuredOffer(): Offer {
    return this.offers[0];
  }
}
