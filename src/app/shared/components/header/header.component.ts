import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BranchSwitcherComponent } from '../../../features/public/branch-switcher/branch-switcher.component';
import { LanguageToggleComponent } from './language-toggle/language-toggle.component';
import { LanguageService } from '../../../core/services/language.service';
import { BranchService, Branch } from '../../../core/services/branch.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    BranchSwitcherComponent,
    LanguageToggleComponent
  ],
  template: `
    <header class="sticky top-0 z-50 bg-surface shadow-soft border-b-2 border-primary/20">
      <!-- Decorative Egyptian Border -->
      <div class="h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
      
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-18">
          <!-- Logo -->
          <div class="flex items-center">
            <img src="assets/brand/logo.png" alt="الزاوي" class="h-12 w-auto">
            <span class="mr-3 text-xl font-bold text-primary">الزاوي</span>
          </div>
          
          <!-- Navigation Links -->
          <nav class="hidden md:flex items-center space-x-8 space-x-reverse">
            <a routerLink="/menu" 
               routerLinkActive="text-primary border-b-2 border-primary"
               class="text-neutral-800 hover:text-primary transition-colors duration-200 py-2">
              القائمة
            </a>
            <a routerLink="/offers" 
               routerLinkActive="text-primary border-b-2 border-primary"
               class="text-neutral-800 hover:text-primary transition-colors duration-200 py-2">
              العروض
            </a>
            <a href="/#branches" 
               class="text-neutral-800 hover:text-primary transition-colors duration-200 py-2">
              فروعنا
            </a>
            <a routerLink="/contact" 
               routerLinkActive="text-primary border-b-2 border-primary"
               class="text-neutral-800 hover:text-primary transition-colors duration-200 py-2">
              اتصل بنا
            </a>
          </nav>
          
          <!-- Right Side -->
          <div class="flex items-center space-x-4 space-x-reverse">
            <!-- Branch Switcher -->
            <app-branch-switcher></app-branch-switcher>
            
            <!-- Language Toggle -->
            <app-language-toggle></app-language-toggle>
            
            <!-- Phone CTA -->
            <a href="tel:0100-000-0000" 
               class="hidden sm:flex items-center space-x-2 space-x-reverse bg-primary text-surface px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors duration-200">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span class="text-sm font-medium">اتصل الآن</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: []
})
export class HeaderComponent {
  constructor(
    public languageService: LanguageService,
    private branchService: BranchService
  ) {}
}
