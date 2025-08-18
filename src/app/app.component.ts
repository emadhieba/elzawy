import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LanguageService } from './core/services/language.service';
import { BranchService } from './core/services/branch.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div [dir]="languageService.currentLanguage() === 'ar' ? 'rtl' : 'ltr'" 
         [class]="'font-' + (languageService.currentLanguage() === 'ar' ? 'ar' : 'en')">
      <app-header></app-header>
      <main class="min-h-screen">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: []
})
export class AppComponent {
  constructor(
    public languageService: LanguageService,
    private branchService: BranchService
  ) {
    // Initialize default branch and language
    effect(() => {
      const currentBranch = this.branchService.activeBranch();
      const currentLang = this.languageService.currentLanguage();
      
      // Update document attributes
      document.documentElement.lang = currentLang;
      document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
      
      // Update title based on language
      if (currentLang === 'ar') {
        document.title = 'الزاوي - مطاعم متعددة الفروع';
      } else {
        document.title = 'Al-Zawy - Multi-Branch Restaurants';
      }
    });
  }
}
