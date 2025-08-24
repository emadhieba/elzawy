import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {
  offers = [
    'offer1.jpg',
    'offer2.jpg',
    'offer3.jpg',
    'offer4.jpg',
    'offer5.jpg',
    'offer6.jpg'
  ];
}
