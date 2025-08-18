import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="relative h-70 md:h-115 overflow-hidden">
      <!-- Carousel Slides -->
      <div class="relative h-full">
        <div *ngFor="let slide of slides; let i = index"   
             [class.opacity-100]="currentSlide() === i"    
             [class.opacity-0]="currentSlide() !== i"      
             class="absolute inset-0 transition-opacity duration-1000">

          <!-- Background Image -->
          <img [src]="slide.image"
               [alt]="slide.title"
               class="w-full h-full object-cover">

          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent"></div>

          <!-- Content -->
          <div class="absolute inset-0 flex items-center"> 
            <div class="container mx-auto px-4">
              <div class="max-w-2xl">
                <!-- Badge -->
                <div class="inline-block bg-accent text-neutral-800 px-4 py-2 rounded-full text-sm font-bold mb-4">   
                  عرض اليوم
                </div>

                <!-- Title -->
                <h1 class="text-4xl md:text-6xl font-bold text-surface mb-4 leading-tight">
                  {{ slide.title }}
                </h1>

                <!-- Subtitle -->
                <p class="text-lg md:text-xl text-surface/90 mb-8">
                  {{ slide.subtitle }}
                </p>

                <!-- CTA Button -->
                <a [routerLink]="slide.buttonLink"
                   class="btn btn-lg btn-filled">
                  {{ slide.buttonText }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Dots -->
      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 space-x-reverse">
        <button *ngFor="let slide of slides; let i = index"
                (click)="goToSlide(i)"
                [class.bg-surface]="currentSlide() === i"  
                [class.bg-surface/50]="currentSlide() !== i"
                class="w-3 h-3 rounded-full transition-colors duration-300">
        </button>
      </div>

      <!-- Navigation Arrows -->
      <button (click)="previousSlide()"
              class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-surface/20 hover:bg-surface/40 text-surface p-2 rounded-full transition-colors duration-300">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <button (click)="nextSlide()"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-surface/20 hover:bg-surface/40 text-surface p-2 rounded-full transition-colors duration-300">        
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

  slides: HeroSlide[] = [
    {
      id: 1,
      image: 'assets/hero/offer-1.jpg',
      title: 'أفضل المشويات المصرية',   
      subtitle: 'جودة من 1980، مذاق مصري أصيل',
      buttonText: 'اطلب الآن',
      buttonLink: '/menu'
    },
    {
      id: 2,
      image: 'assets/hero/offer-2.jpg',
      title: 'عروض خاصة على البروست',    
      subtitle: 'خصم يصل إلى 30% على جميع أنواع البروست',
      buttonText: 'شاهد العروض',
      buttonLink: '/offers'
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

  startAutoPlay(): void {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 5000);
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

  goToSlide(index: number): void {
    this.currentSlide.set(index);
  }
}
