import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-neutral-950 text-surface py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- عن الزاوي -->
          <div class="text-center md:text-right">
            <h3 class="text-lg font-bold mb-4 text-accent">عن الزاوي</h3>
            <ul class="space-y-2">
              <li class="text-neutral-300">جودة من 1980</li>
              <li class="text-neutral-300">مذاق مصري أصيل</li>
            </ul>
          </div>
          
          <!-- الفروع -->
          <div class="text-center">
            <h3 class="text-lg font-bold mb-4 text-accent">الفروع</h3>
            <ul class="space-y-2">
              <li class="text-neutral-300">الزاوي نيو</li>
              <li class="text-neutral-300">اولاد الزاوي للمشويات</li>
            </ul>
          </div>
          
          <!-- تواصل -->
          <div class="text-center md:text-left">
            <h3 class="text-lg font-bold mb-4 text-accent">تواصل</h3>
            <ul class="space-y-2">
              <li class="text-neutral-300">0100-000-0000</li>
              <li class="text-neutral-300">facebook.com/alzawy</li>
            </ul>
          </div>
        </div>
        
        <!-- Small Print -->
        <div class="border-t border-neutral-800 mt-8 pt-8 text-center">
          <p class="text-neutral-400 text-sm">© جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
  constructor(public languageService: LanguageService) {}
}
