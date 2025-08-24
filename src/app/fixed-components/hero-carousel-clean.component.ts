import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselSlide } from '../models/carousel.model';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative h-[300px] md:h-[460px] overflow-hidden rounded-2xl shadow-lg"
             (mouseenter)="onMouseEnter()"
             (mouseleave)="onMouseLeave()">
      <div class="relative h-full">
        <div *ngFor="let slide of slides; let i = index"
             [class.opacity-100]="currentSlide() === i"
             [class.opacity-0]="currentSlide() !== i"
             class="absolute inset-0 transition-opacity duration-1000 ease-in-out">
          <img [src]="slide.image" [alt]="slide.title" class="w-full h-full object-cover rounded-2xl">
          <div class="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent rounded-2xl"></div>
          <div class="absolute inset-0 flex items-center">
            <div class="container mx-auto px-4">
              <div class="max-w-2xl">
                <div class="inline-block bg-accent text-neutral-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  عرض اليوم
                </div>
                <h1 class="text-4xl md:text-6xl font-bold text-surface mb-4 leading-tight">
                  {{ slide.title }}
                </h1>
                <p class="text-lg md:text-xl text-surface/90 mb-8">
                  {{ slide.description }}
                </p>
                <a [href]="slide.buttonLink" class="btn btn-lg btn-filled">
                  {{ slide.buttonText }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


      <button (click)="previousSlide()"
              class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-surface/20 hover:bg-surface/40 text-surface p-2 rounded-full transition-colors duration-300 focus:outline-none"
              type="button" aria-label="Previous slide">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button (click)="nextSlide()"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-surface/20 hover:bg-surface/40 text-surface p-2 rounded-full transition-colors duration-300 focus:outline-none"
              type="button" aria-label="Next slide">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </section>
  `,
  styles: []
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  currentSlide = signal(0);
  private interval?: any;

  slides: CarouselSlide[] = [
    {
      id: 1,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (1).jpeg',
      title: 'أجود أنواع اللحوم',
      description: 'تذوق ألذ الأطباق المشوية',
      buttonText: 'اطلب الآن',
      buttonLink: '/menu'
    },
    {
      id: 2,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (2).jpeg',
      title: 'عروض خاصة',
      description: 'خصومات تصل إلى 30% على الوجبات العائلية',
      buttonText: 'شاهد العروض',
      buttonLink: '/offers'
    },
    {
      id: 3,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (3).jpeg',
      title: 'توصيل سريع',
      description: 'توصيل لجميع أنحاء المدينة خلال 45 دقيقة',
      buttonText: 'اطلب الآن',
      buttonLink: '/menu'
    },
    {
      id: 4,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (5).jpeg',
      title: 'وجبات عائلية',
      description: 'وجبات كاملة تناسب جميع أفراد العائلة',
      buttonText: 'تصفح القائمة',
      buttonLink: '/menu'
    }
  ];

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private startAutoPlay(): void {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  onMouseEnter(): void {
    if (this.interval) clearInterval(this.interval);
  }

  onMouseLeave(): void {
    this.startAutoPlay();
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    if (this.interval) {
      clearInterval(this.interval);
      this.startAutoPlay();
    }
  }

  nextSlide(): void {
    this.currentSlide.update(current =>
      current === this.slides.length - 1 ? 0 : current + 1
    );
  }

  previousSlide(): void {
    this.currentSlide.update(current =>
      current === 0 ? this.slides.length - 1 : current - 1
    );
  }
}
