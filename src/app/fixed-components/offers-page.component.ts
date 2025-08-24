import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offer } from '../models/offer.model';

@Component({
  selector: 'app-offers-page',
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
                <h3 class="text-4xl font-bold mb-4">وجبة عائلية كاملة</h3>
                <p class="text-xl mb-6 opacity-90">فرختين مشويتين + كيلو أرز + سلطة كبيرة + مشروبات</p>
                <div class="flex items-center gap-4 mb-6">
                  <span class="text-3xl font-bold">199 جنيه</span>
                  <span class="text-xl line-through opacity-70">280 جنيه</span>
                  <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    وفر 81 جنيه
                  </span>
                </div>
                <button class="bg-accent text-neutral-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition-colors duration-300">
                  اطلب الآن
                </button>
              </div>
              <div class="text-center">
                <img src="assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (1).jpeg" alt="وجبة عائلية" 
                     class="w-full max-w-md mx-auto rounded-2xl shadow-lg">
              </div>
            </div>
          </div>
        </div>

        <!-- Offers Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let offer of offers" 
               class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            
            <!-- Offer Image -->
            <div class="relative">
              <img [src]="offer.image" [alt]="offer.title" 
                   class="w-full h-48 object-cover">
              
              <!-- Discount Badge -->
              <div class="absolute top-4 right-4">
                <div class="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                  خصم {{ offer.discount }}%
                </div>
              </div>

              <!-- Limited Offer Badge -->
              <div *ngIf="offer.isLimited" class="absolute top-4 left-4">
                <div class="bg-accent text-neutral-800 px-3 py-1 rounded-full font-bold text-sm">
                  عرض محدود
                </div>
              </div>
            </div>

            <!-- Offer Content -->
            <div class="p-6">
              <h3 class="text-2xl font-bold text-neutral-800 mb-3">{{ offer.title }}</h3>
              <p class="text-neutral-600 mb-4 leading-relaxed">{{ offer.description }}</p>
              
              <!-- Pricing -->
              <div class="flex items-center justify-between mb-4">
                <div>
                  <span class="text-2xl font-bold text-primary">{{ offer.discountPrice }} جنيه</span>
                  <span class="text-lg text-neutral-500 line-through block">{{ offer.originalPrice }} جنيه</span>
                </div>
                <div class="text-right">
                  <div class="text-sm text-neutral-500">صالح حتى</div>
                  <div class="font-semibold text-neutral-700">{{ offer.validUntil }}</div>
                </div>
              </div>

              <!-- Items Left (if limited) -->
              <div *ngIf="offer.isLimited && offer.itemsLeft" class="mb-4">
                <div class="flex items-center gap-2 text-sm text-orange-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  متبقي {{ offer.itemsLeft }} فقط!
                </div>
              </div>
              
              <!-- Order Button -->
              <button class="w-full bg-primary text-surface py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                اطلب العرض
              </button>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-16">
          <div class="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 class="text-3xl font-bold text-neutral-800 mb-4">لا تفوت العروض!</h3>
            <p class="text-neutral-600 mb-6">اشترك في نشرتنا البريدية لتصلك أحدث العروض والخصومات</p>
            <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="أدخل بريدك الإلكتروني" 
                     class="flex-1 px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary">
              <button class="bg-primary text-surface px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-300">
                اشترك الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class OffersPageComponent {
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
}
