import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-menu-items',
  standalone: true,
  imports: [CommonModule, CategoriesComponent],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.css'
})
export class MenuItemsComponent {
  menuItems = [
    { name: 'شاورما لحم', img: 'shawarma.jpg', price: 60, desc: 'شاورما لحم طازجة مع صوص الزاوي الخاص.' },
    { name: 'شاورما فراخ', img: 'chicken-shawarma.jpg', price: 55, desc: 'شاورما فراخ متبلة مع بطاطس.' },
    { name: 'وجبة مشاوي مشكلة', img: 'grill-mix.jpg', price: 120, desc: 'كفتة، كباب، شيش طاووق مع أرز وسلطة.' },
    { name: 'برجر لحم', img: 'burger.jpg', price: 70, desc: 'برجر لحم بقري مع جبنة وخضار.' },
    { name: 'بيتزا مارجريتا', img: 'pizza.jpg', price: 80, desc: 'بيتزا إيطالي بعجينة هشة وجبنة موزاريلا.' }
  ];
}
