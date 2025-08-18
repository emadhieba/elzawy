import { Injectable, signal } from '@angular/core';

export type Language = 'ar' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANGUAGE_KEY = 'zawy_language';
  
  public currentLanguage = signal<Language>('ar');
  
  constructor() {
    this.initializeLanguage();
  }
  
  private initializeLanguage(): void {
    const savedLanguage = localStorage.getItem(this.LANGUAGE_KEY) as Language;
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      this.currentLanguage.set(savedLanguage);
    } else {
      this.currentLanguage.set('ar'); // Default to Arabic
    }
  }
  
  setLanguage(language: Language): void {
    this.currentLanguage.set(language);
    localStorage.setItem(this.LANGUAGE_KEY, language);
    
    // Update document attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }
  
  toggleLanguage(): void {
    const newLang = this.currentLanguage() === 'ar' ? 'en' : 'ar';
    this.setLanguage(newLang);
  }
  
  isRTL(): boolean {
    return this.currentLanguage() === 'ar';
  }
}
