import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroCarouselComponent } from './hero-carousel-clean.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    HeroCarouselComponent
  ],
  template: `
    <main>
      <!-- Hero Carousel -->
      <app-hero-carousel></app-hero-carousel>

      <!-- Menu Preview Section -->
      <section class="py-16 bg-neutral-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-neutral-800 mb-4">تذوق أشهى الأطباق</h2>
            <p class="text-xl text-neutral-600 mb-8">اكتشف قائمتنا المتنوعة من الأطباق الشهية</p>
            <a routerLink="/menu" class="btn btn-lg btn-filled">
              عرض القائمة كاملة
            </a>
          </div>
        </div>
      </section>

      <!-- Quick Offers Preview -->
      <section class="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-neutral-800 mb-4">العروض الخاصة</h2>
            <p class="text-xl text-neutral-600 mb-8">لا تفوت عروضنا المحدودة</p>
            <a routerLink="/offers" class="btn btn-lg btn-outline">
              شاهد جميع العروض
            </a>
          </div>
          
          <!-- Featured Offer Card -->
          <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div class="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                عرض محدود
              </div>
              <h3 class="text-3xl font-bold text-neutral-800 mb-4">وجبة عائلية كاملة</h3>
              <p class="text-neutral-600 mb-6">فرختين مشويتين + كيلو أرز + سلطة كبيرة + مشروبات</p>
              <div class="flex items-center justify-center gap-4 mb-6">
                <span class="text-3xl font-bold text-primary">199 جنيه</span>
                <span class="text-xl line-through text-neutral-500">280 جنيه</span>
                <span class="bg-accent text-neutral-800 px-3 py-1 rounded-full text-sm font-bold">
                  وفر 81 جنيه
                </span>
              </div>
              <button class="btn btn-lg btn-filled">
                اطلب الآن
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-4xl font-bold text-neutral-800 mb-6">مطاعم الزاوي</h2>
              <p class="text-lg text-neutral-600 mb-6 leading-relaxed">
                نحن نقدم أشهى الأطباق المصرية والشرقية بأعلى معايير الجودة والطعم الأصيل. 
                مع خدمة متميزة وأجواء مريحة لجميع أفراد العائلة.
              </p>
              <div class="grid grid-cols-2 gap-6 mb-8">
                <div class="text-center">
                  <div class="text-3xl font-bold text-primary mb-2">15+</div>
                  <div class="text-neutral-600">فرع في مصر</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-primary mb-2">1000+</div>
                  <div class="text-neutral-600">عميل راضي</div>
                </div>
              </div>
              <a routerLink="/contact" class="btn btn-lg btn-outline">
                اتصل بنا
              </a>
            </div>
            <div class="text-center">
              <img src="assets/hero/restaurant-interior.jpg" alt="مطعم الزاوي" 
                   class="w-full rounded-2xl shadow-lg">
            </div>
          </div>
        </div>
      </section>
    </main>
  `
})
export class HomeComponent {}

// Make sure to update your routing module to use this component
// Example:
// { path: '', component: HomeComponent }
