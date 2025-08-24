import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule,
    RouterModule
  ],
  template: `
    <section class="py-16 bg-neutral-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-neutral-800 mb-4">اتصل بنا</h1>
          <p class="text-xl text-neutral-600">يسعدنا تواصلك معنا في أي وقت</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-neutral-800 mb-6">أرسل لنا رسالة</h2>
            
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-neutral-700 mb-1">الاسم بالكامل *</label>
                  <input type="text" id="name" formControlName="name"
                         class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                         [class.border-red-500]="name?.invalid && (name?.dirty || name?.touched)"
                         [class.border-neutral-300]="!name?.invalid || (!name?.dirty && !name?.touched)">
                  <div *ngIf="name?.invalid && (name?.dirty || name?.touched)" class="text-red-500 text-xs mt-1">
                    <span *ngIf="name?.errors?.['required']">الاسم مطلوب</span>
                    <span *ngIf="name?.errors?.['minlength']">يجب أن يكون الاسم 3 أحرف على الأقل</span>
                  </div>
                </div>
                
                <div>
                  <label for="email" class="block text-sm font-medium text-neutral-700 mb-1">البريد الإلكتروني *</label>
                  <input type="email" id="email" formControlName="email"
                         class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                         [class.border-red-500]="email?.invalid && (email?.dirty || email?.touched)"
                         [class.border-neutral-300]="!email?.invalid || (!email?.dirty && !email?.touched)">
                  <div *ngIf="email?.invalid && (email?.dirty || email?.touched)" class="text-red-500 text-xs mt-1">
                    <span *ngIf="email?.errors?.['required']">البريد الإلكتروني مطلوب</span>
                    <span *ngIf="email?.errors?.['email']">البريد الإلكتروني غير صالح</span>
                  </div>
                </div>
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-neutral-700 mb-1">رقم الهاتف</label>
                <input type="tel" id="phone" formControlName="phone"
                       class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                       [class.border-red-500]="phone?.invalid && (phone?.dirty || phone?.touched)"
                       [class.border-neutral-300]="!phone?.invalid || (!phone?.dirty && !phone?.touched)">
                <div *ngIf="phone?.invalid && (phone?.dirty || phone?.touched)" class="text-red-500 text-xs mt-1">
                  <span *ngIf="phone?.errors?.['pattern']">الرجاء إدخال رقم هاتف صحيح</span>
                </div>
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-neutral-700 mb-1">الموضوع *</label>
                <input type="text" id="subject" formControlName="subject"
                       class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                       [class.border-red-500]="subject?.invalid && (subject?.dirty || subject?.touched)"
                       [class.border-neutral-300]="!subject?.invalid || (!subject?.dirty && !subject?.touched)">
                <div *ngIf="subject?.invalid && (subject?.dirty || subject?.touched)" class="text-red-500 text-xs mt-1">
                  <span *ngIf="subject?.errors?.['required']">الموضوع مطلوب</span>
                  <span *ngIf="subject?.errors?.['minlength']">يجب أن يكون الموضوع 5 أحرف على الأقل</span>
                </div>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-neutral-700 mb-1">الرسالة *</label>
                <textarea id="message" formControlName="message" rows="4"
                          class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          [class.border-red-500]="message?.invalid && (message?.dirty || message?.touched)"
                          [class.border-neutral-300]="!message?.invalid || (!message?.dirty && !message?.touched)"></textarea>
                <div *ngIf="message?.invalid && (message?.dirty || message?.touched)" class="text-red-500 text-xs mt-1">
                  <span *ngIf="message?.errors?.['required']">الرسالة مطلوبة</span>
                  <span *ngIf="message?.errors?.['minlength']">يجب أن تكون الرسالة 10 أحرف على الأقل</span>
                </div>
              </div>

              <button type="submit" [disabled]="contactForm.invalid || isSubmitting"
                      class="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200">
                <span *ngIf="!isSubmitting">إرسال الرسالة</span>
                <span *ngIf="isSubmitting">جاري الإرسال...</span>
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <h2 class="text-2xl font-bold text-neutral-800 mb-6">معلومات التواصل</h2>
              
              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="bg-primary/10 p-3 rounded-full mr-4">
                    📍
                  </div>
                  <div>
                    <h3 class="font-medium text-neutral-800">العنوان</h3>
                    <p class="text-neutral-600">123 شارع التحرير، القاهرة، مصر</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-primary/10 p-3 rounded-full mr-4">
                    📞
                  </div>
                  <div>
                    <h3 class="font-medium text-neutral-800">اتصل بنا</h3>
                    <p class="text-neutral-600">+20 100 000 0000</p>
                    <p class="text-neutral-600">+20 200 000 0000</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-primary/10 p-3 rounded-full mr-4">
                    ✉️
                  </div>
                  <div>
                    <h3 class="font-medium text-neutral-800">البريد الإلكتروني</h3>
                    <p class="text-neutral-600">info&#64;alzawy.com</p>
                    <p class="text-neutral-600">support&#64;alzawy.com</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-primary/10 p-3 rounded-full mr-4">
                    ⏰
                  </div>
                  <div>
                    <h3 class="font-medium text-neutral-800">ساعات العمل</h3>
                    <p class="text-neutral-600">السبت - الخميس: 9 صباحاً - 12 مساءً</p>
                    <p class="text-neutral-600">الجمعة: 2 مساءً - 12 مساءً</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Branches -->
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <h2 class="text-2xl font-bold text-neutral-800 mb-6">فروعنا</h2>
              
              <div class="space-y-6">
                <div *ngFor="let branch of branches" class="border-b border-neutral-100 pb-6 last:border-0 last:pb-0">
                  <h3 class="font-bold text-lg text-neutral-800 mb-2">{{ branch.name }}</h3>
                  <p class="text-neutral-600 mb-2">{{ branch.address }}</p>
                  <p class="text-neutral-600">
                    <span class="font-medium">هاتف:</span> {{ branch.phone }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ContactComponent {
  isSubmitting = false;
  
  // Form controls with validation
  contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required, 
      Validators.email
    ]),
    phone: new FormControl('', [
      Validators.pattern(/^[0-9+\s-]+$/)
    ]),
    subject: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])
  });

  // Getters for form controls
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get phone() { return this.contactForm.get('phone'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }

  branches = [
    {
      id: 1,
      name: 'الفرع الرئيسي - القاهرة',
      address: '123 شارع التحرير، وسط البلد، القاهرة',
      phone: '+20 100 000 0001',
      email: 'cairo@alzawy.com',
      workingHours: '9:00 ص - 12:00 م'
    },
    {
      id: 2,
      name: 'فرع المعادي',
      address: '45 شارع النصر، المعادي، القاهرة',
      phone: '+20 100 000 0002',
      email: 'maadi@alzawy.com',
      workingHours: '10:00 ص - 11:00 م'
    },
    {
      id: 3,
      name: 'فرع الشيخ زايد',
      address: 'مول العرب، الشيخ زايد، الجيزة',
      phone: '+20 100 000 0003',
      email: 'sheikhzayed@alzawy.com',
      workingHours: '11:00 ص - 12:00 م'
    }
  ];

  onSubmit() {
    // Mark all fields as touched to show validation messages
    this.contactForm.markAllAsTouched();
    
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', this.contactForm.value);
        this.isSubmitting = false;
        this.contactForm.reset();
        
        // Show success message
        alert('تم إرسال رسالتك بنجاح. سنتواصل معك قريباً!');
      }, 1500);
    }
  }
}
