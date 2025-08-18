import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="languageService.toggleLanguage()"
      class="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
      [attr.aria-label]="languageService.currentLanguage() === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'">
      
      <span class="text-sm font-medium">
        {{ languageService.currentLanguage() === 'ar' ? 'EN' : 'عربي' }}
      </span>
      
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
      </svg>
    </button>
  `,
  styles: []
})
export class LanguageToggleComponent {
  constructor(public languageService: LanguageService) {}
}
