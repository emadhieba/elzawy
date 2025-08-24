import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories = [
    { name: 'ساندوتشات', icon: '🥪' },
    { name: 'بيتزا', icon: '🍕' },
    { name: 'مشاوي', icon: '🥩' },
    { name: 'دجاج', icon: '🍗' },
    { name: 'سلطات', icon: '🥗' },
    { name: 'مشروبات', icon: '🥤' }
  ];
}
