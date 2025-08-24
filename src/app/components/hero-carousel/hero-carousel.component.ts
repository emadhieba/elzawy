import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselSlide } from '../../models/carousel.model';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="relative overflow-hidden h-[500px] md:h-[600px] w-full">
      <!-- Slides Container -->
      <div class="relative h-full w-full">
        <!-- Slides -->
        <div *ngFor="let slide of slides; let i = index" 
             [class.opacity-0]="currentSlide() !== i"
             [class.invisible]="currentSlide() !== i"
             [class.animate-fadeIn]="currentSlide() === i"
             class="absolute inset-0 transition-opacity duration-1000 ease-in-out">
          <div class="absolute inset-0">
            <img [src]="slide.image" [alt]="slide.title" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div class="relative z-10 h-full flex items-center">
            <div class="container mx-auto px-4 text-right">
              <div class="max-w-2xl ml-auto">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
                  {{ slide.title }}
                </h2>
                <p class="text-lg text-white/90 mb-8 max-w-lg">
                  {{ slide.description }}
                </p>
                <a [routerLink]="slide.buttonLink" 
                   class="inline-block bg-accent text-neutral-900 px-8 py-3 rounded-lg font-bold hover:bg-accent/90 transition-colors">
                  {{ slide.buttonText }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button (click)="prevSlide()" 
              class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 p-3 rounded-full text-white hover:bg-white/30">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button (click)="nextSlide()" 
              class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 p-3 rounded-full text-white hover:bg-white/30">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Indicators -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        <div *ngFor="let _ of slides; let i = index" 
             (click)="goToSlide(i)"
             [class]="currentSlide() === i ? 'bg-white' : 'bg-white/50'"
             class="w-3 h-3 rounded-full transition-all duration-300 cursor-pointer">
          <span class="sr-only">Slide {{ i + 1 }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out forwards;
    }
  `]
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  currentSlide = signal(0);
  autoSlideInterval: any;
  
  slides: CarouselSlide[] = [
    {
      id: 1,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (1).jpeg',
      title: 'أجود أنواع اللحوم',
      description: 'تذوق ألذ الأطباق المشوية من أفضل أنواع اللحوم المختارة بعناية',
      buttonText: 'اطلب الآن',
      buttonLink: '/menu'
    },
    {
      id: 2,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (2).jpeg',
      title: 'عروض خاصة',
      description: 'استمتع بخصومات تصل إلى 30% على الوجبات العائلية',
      buttonText: 'عرض العروض',
      buttonLink: '/offers'
    },
    {
      id: 3,
      image: 'assets/offers/WhatsApp Image 2025-08-11 at 12.06.14 PM (3).jpeg',
      title: 'وجبات سريعة ولذيذة',
      description: 'أشهى السندويشات والوجبات السريعة بأسرع وقت',
      buttonText: 'تصفح القائمة',
      buttonLink: '/menu'
    }
  ];

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlide.set((this.currentSlide() + 1) % this.slides.length);
  }

  prevSlide() {
    this.currentSlide.set((this.currentSlide() - 1 + this.slides.length) % this.slides.length);
  }

  goToSlide(index: number) {
    this.currentSlide.set(index);
  }
}
