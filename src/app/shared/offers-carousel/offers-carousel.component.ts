import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

@Component({
  selector: 'app-offers-carousel',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './offers-carousel.component.html',
  styleUrl: './offers-carousel.component.css'
})
export class OffersCarouselComponent implements OnInit, OnDestroy {
  private swiper?: Swiper;

  offers = [
    'offer1.jpg',
    'offer2.jpg',
    'offer3.jpg',
    'offer4.jpg',
    'offer5.jpg',
    'offer6.jpg'
  ];

  ngOnInit(): void {
    this.initSwiper();
  }

  ngOnDestroy(): void {
    if (this.swiper) {
      this.swiper.destroy();
    }
  }

  private initSwiper(): void {
    // Initialize Swiper modules
    Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);

    this.swiper = new Swiper('.offers-swiper', {
      modules: [Navigation, Pagination, Autoplay, EffectFade],
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      loop: true,
      speed: 800,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
      },
      // RTL support
      direction: 'horizontal',
      // Responsive breakpoints
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 1,
        }
      }
    });
  }
}
