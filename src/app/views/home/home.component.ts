import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroCarouselComponent } from '../../components/hero-carousel/hero-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroCarouselComponent],
  template: `
    <!-- Hero Section -->
    <app-hero-carousel></app-hero-carousel>

    <!-- Menu Preview Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-neutral-800 mb-4">قائمة الطعام المميزة</h2>
          <p class="text-xl text-neutral-600">اكتشف أشهى الأطباق المصرية الأصيلة</p>
        </div>
        
        <!-- Menu Items Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div *ngFor="let item of featuredItems" class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="relative">
              <img [src]="item.image" [alt]="item.name" class="w-full h-48 object-cover">
              <div *ngIf="item.isNew" class="absolute top-4 left-4 bg-accent text-neutral-800 px-3 py-1 rounded-full text-xs font-bold">
                جديد
              </div>
              <div *ngIf="item.discount" class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                خصم {{ item.discount }}%
              </div>
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-bold text-neutral-800">{{ item.name }}</h3>
                <div class="text-right">
                  <div *ngIf="item.originalPrice" class="text-sm line-through text-neutral-500">{{ item.originalPrice }} ج.م</div>
                  <div class="text-lg font-bold text-primary">{{ item.price }} ج.م</div>
                </div>
              </div>
              <p class="text-neutral-600 mb-4">{{ item.description }}</p>
              <button class="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200">
                أضف إلى السلة
              </button>
            </div>
          </div>
        </div>
        
        <div class="text-center">
          <a routerLink="/menu" class="inline-block bg-accent text-neutral-800 px-8 py-3 rounded-lg font-bold hover:bg-accent-dark transition-colors duration-200">
            عرض القائمة الكاملة
          </a>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-16 bg-neutral-50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold text-neutral-800 mb-6">من نحن</h2>
            <p class="text-lg text-neutral-600 mb-6">
              مطعم الزاوي هو وجهتك الأولى لتجربة الطعم الأصيل والمذاق المميز. نقدم أشهى الأطباق المصرية والعربية بأجود المكونات وأفضل طرق الطهي.
            </p>
            <div class="grid grid-cols-2 gap-6 mt-8">
              <div class="text-center">
                <div class="text-4xl font-bold text-primary mb-2">+15</div>
                <div class="text-neutral-600">سنة خبرة</div>
              </div>
              <div class="text-center">
                <div class="text-4xl font-bold text-primary mb-2">+50</div>
                <div class="text-neutral-600">صنف مميز</div>
              </div>
              <div class="text-center">
                <div class="text-4xl font-bold text-primary mb-2">+10K</div>
                <div class="text-neutral-600">عميل سعيد</div>
              </div>
              <div class="text-center">
                <div class="text-4xl font-bold text-primary mb-2">5</div>
                <div class="text-neutral-600">فروع</div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img src="assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (5).jpeg" alt="عن المطعم" class="w-full h-auto">
            </div>
            <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full z-0"></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class HomeComponent {
  featuredItems = [
    {
      id: 1,
      name: 'شيش طاووق مشوي',
      description: 'قطع دجاج مشوية على الفحم مع الأرز والصلصة',
      price: 120,
      originalPrice: 140,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (1).jpeg',
      isNew: true,
      isPopular: true
    },
    {
      id: 2,
      name: 'كباب حلة',
      description: 'لحم ضأن مشوي مع الأرز والسلطة',
      price: 135,
      originalPrice: 150,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (2).jpeg',
      isPopular: true,
      discount: 10
    },
    {
      id: 3,
      name: 'شاورما دجاج',
      description: 'شاورما دجاج مع الثومية والخضار',
      price: 80,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (3).jpeg',
      isNew: true
    }
  ];
}
