import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, RouterModule } from '@angular/router';
import { BranchSwitcherComponent } from '../../../features/public/branch-switcher/branch-switcher.component';
import { LanguageToggleComponent } from './language-toggle/language-toggle.component';
import { LanguageService } from '../../../core/services/language.service';
import { BranchService, Branch } from '../../../core/services/branch.service';
import { CartService } from '../../../services/cart.service';
import { animate, style, transition, trigger, state } from '@angular/animations';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    BranchSwitcherComponent,
    LanguageToggleComponent
  ],
  animations: [
    trigger('count', [
      transition('* <=> *', [
        style({ transform: 'scale(1.2)' }),
        animate('300ms ease-out', style({ transform: 'scale(1)' }))
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0, transform: 'translateY(-10px)' })),
      transition('out => in', [
        animate('200ms ease-out')
      ]),
      transition('in => out', [
        animate('150ms ease-in')
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', 
          style({ opacity: 1 })
        )
      ])
    ])
  ]
})
export class HeaderComponent {
  // Services
  private cartService = inject(CartService);
  router = inject(Router);
  private languageService = inject(LanguageService);
  private branchService = inject(BranchService);

  // State
  isScrolled = false;
  isCartOpen = false;
  isMobileMenuOpen = false;

  // Texts
  branchesText = 'فروعنا';
  workingHoursText = 'يومياً من 10 صباحاً حتى 2 صباحاً';
  phoneNumber = '0100-000-0000';
  logoText = 'الزعيم';
  taglineText = 'أشهى المأكولات الشرقية';
  homeText = 'الرئيسية';
  menuText = 'القائمة';
  offersText = 'العروض';
  newBadgeText = 'جديد';
  contactText = 'اتصل بنا';
  callNowText = 'اتصل الآن';
  emptyCartTitle = 'سلة التسوق فارغة';
  emptyCartSubtitle = 'أضف بعض المنتجات إلى سلة التسوق الخاصة بك';
  browseMenuText = 'تصفح القائمة';

  // Cart related
  itemCount = this.cartService.getItemCount();
  cartItems = this.cartService.getCartItems();
  cartTotal = this.cartService.getCartTotalSignal();
  
  // Cart item type for template
  cartItemType = this.cartService.getCartItems();

  // Language and branch
  currentLanguage = this.languageService.currentLanguage;
  branches = this.branchService.branches;
  currentBranch = this.branchService.activeBranch;

  // Navigation items
  navItems = [
    { label: 'الرئيسية', route: '/', active: true },
    { label: 'القائمة', route: '/menu' },
    { label: 'العروض', route: '/offers' },
    { label: 'فروعنا', route: '/branches' },
    { label: 'اتصل بنا', route: '/contact' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // Navigation methods
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMobileMenuOpen = false;
  }

  navigateHome(): void {
    this.router.navigate(['/']);
    window.scrollTo(0, 0);
  }

  // Cart methods
  toggleCart(open?: boolean): void {
    this.isCartOpen = open !== undefined ? open : !this.isCartOpen;
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
    this.isCartOpen = false;
  }

  updateQuantity(itemId: number, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(itemId, quantity);
    }
  }

  removeFromCart(itemId: number): void {
    this.cartService.removeFromCart(itemId);
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
    this.isCartOpen = false;
  }

  // Language and branch methods
  changeLanguage(lang: 'ar' | 'en'): void {
    this.languageService.setLanguage(lang);
  }

  changeBranch(branch: Branch): void {
    this.branchService.setActiveBranch(branch);
  }

  // Mobile menu toggle
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Toggle body scroll when mobile menu is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  // Helper method to check active route
  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
