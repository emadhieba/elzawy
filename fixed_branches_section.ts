import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchService, Branch } from '../../../../core/services/branch.service';

@Component({
  selector: 'app-branches-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="branches" class="py-16 bg-surface">       
      <div class="container mx-auto px-4">
        <!-- Section Heading -->
        <div class="section-heading">
          <h2 class="text-h2 text-neutral-800 mb-4">فروعنا</h2>
          <p class="text-body-lg text-neutral-600">زورنا في أي من فروعنا المنتشرة في أنحاء القاهرة</p>
        </div>

        <!-- Branches Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div *ngFor="let branch of branchService.branches()"
               class="card p-6 text-center">

            <!-- Branch Icon -->
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>

            <!-- Branch Name -->
            <h3 class="text-h3 text-neutral-800 font-semibold mb-3">
              {{ branch.name }}
            </h3>

            <!-- Branch Details -->
            <div class="space-y-2 mb-6">
              <div *ngIf="branch.address" class="text-body text-neutral-600">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {{ branch.address }}
              </div>

              <div *ngIf="branch.phone" class="text-body text-neutral-600">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                {{ branch.phone }}
              </div>

              <div *ngIf="branch.workingHours" class="text-body text-neutral-600">
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ branch.workingHours }}
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <a [href]="'tel:' + branch.phone"
                 class="btn btn-sm btn-filled">
                اتصل الآن
              </a>
              <button class="btn btn-sm btn-outline">      
                احجز طاولة
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class BranchesSectionComponent {
  constructor(public branchService: BranchService) {}      
}
