import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  workingHours: string;
  mapUrl: string;
  image: string;
}

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="text-5xl font-bold text-neutral-800 mb-4">اتصل بنا</h1>
          <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
            نحن هنا لخدمتك! تواصل معنا في أي وقت وسنكون سعداء للرد على استفساراتك
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <!-- Contact Form -->
          <div class="bg-white rounded-3xl shadow-xl p-8">
            <h2 class="text-3xl font-bold text-neutral-800 mb-6">أرسل لنا رسالة</h2>
            
            <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-neutral-700 font-semibold mb-2">الاسم الكامل *</label>
                  <input 
                    type="text" 
                    [(ngModel)]="formData.name" 
                    name="name"
                    required
                    class="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="أدخل اسمك الكامل">
                </div>
                
                <div>
                  <label class="block text-neutral-700 font-semibold mb-2">رقم الهاتف *</label>
                  <input 
                    type="tel" 
                    [(ngModel)]="formData.phone" 
                    name="phone"
                    required
                    class="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="01xxxxxxxxx">
                </div>
              </div>

              <div>
                <label class="block text-neutral-700 font-semibold mb-2">البريد الإلكتروني *</label>
                <input 
                  type="email" 
                  [(ngModel)]="formData.email" 
                  name="email"
                  required
                  class="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="example@email.com">
              </div>

              <div>
                <label class="block text-neutral-700 font-semibold mb-2">الموضوع *</label>
                <select 
                  [(ngModel)]="formData.subject" 
                  name="subject"
                  required
                  class="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300">
                  <option value="">اختر الموضوع</option>
                  <option value="order">طلب جديد</option>
                  <option value="complaint">شكوى</option>
                  <option value="suggestion">اقتراح</option>
                  <option value="franchise">الامتياز التجاري</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              <div>
                <label class="block text-neutral-700 font-semibold mb-2">الرسالة *</label>
                <textarea 
                  [(ngModel)]="formData.message" 
                  name="message"
                  required
                  rows="5"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="اكتب رسالتك هنا..."></textarea>
              </div>

              <button 
                type="submit" 
                [disabled]="!contactForm.form.valid"
                class="w-full bg-primary text-surface py-4 rounded-xl font-bold text-lg hover:bg-primary/90 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                إرسال الرسالة
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="space-y-8">
            <!-- Quick Contact -->
            <div class="bg-white rounded-3xl shadow-xl p-8">
              <h3 class="text-2xl font-bold text-neutral-800 mb-6">تواصل سريع</h3>
              
              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-neutral-800">خدمة العملاء</div>
                    <div class="text-neutral-600">19991</div>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-neutral-800">واتساب</div>
                    <div class="text-neutral-600">01012345678</div>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-neutral-800">البريد الإلكتروني</div>
                    <div class="text-neutral-600">info&#64;alzawy.com</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Working Hours -->
            <div class="bg-white rounded-3xl shadow-xl p-8">
              <h3 class="text-2xl font-bold text-neutral-800 mb-6">ساعات العمل</h3>
              
              <div class="space-y-4">
                <div class="flex justify-between items-center py-2 border-b border-neutral-100">
                  <span class="font-semibold text-neutral-700">السبت - الخميس</span>
                  <span class="text-neutral-600">10:00 ص - 2:00 ص</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-neutral-100">
                  <span class="font-semibold text-neutral-700">الجمعة</span>
                  <span class="text-neutral-600">2:00 م - 2:00 ص</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="font-semibold text-neutral-700">خدمة التوصيل</span>
                  <span class="text-green-600 font-semibold">24 ساعة</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Branches Section -->
        <div class="mb-16">
          <h2 class="text-4xl font-bold text-neutral-800 text-center mb-12">فروعنا</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let branch of branches" class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <img [src]="branch.image" [alt]="branch.name" class="w-full h-48 object-cover">
              
              <div class="p-6">
                <h3 class="text-xl font-bold text-neutral-800 mb-3">{{ branch.name }}</h3>
                
                <div class="space-y-3 mb-6">
                  <div class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span class="text-neutral-600 text-sm">{{ branch.address }}</span>
                  </div>
                  
                  <div class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span class="text-neutral-600 text-sm">{{ branch.phone }}</span>
                  </div>
                  
                  <div class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-neutral-600 text-sm">{{ branch.workingHours }}</span>
                  </div>
                </div>
                
                <div class="flex gap-3">
                  <a [href]="'tel:' + branch.phone" 
                     class="flex-1 bg-primary text-surface py-2 px-4 rounded-lg text-center font-semibold hover:bg-primary/90 transition-colors duration-300">
                    اتصل
                  </a>
                  <a [href]="'https://wa.me/' + branch.whatsapp" 
                     target="_blank"
                     class="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg text-center font-semibold hover:bg-green-600 transition-colors duration-300">
                    واتساب
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Section -->
        <div class="bg-white rounded-3xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-neutral-800 text-center mb-8">موقعنا على الخريطة</h2>
          <div class="w-full h-96 bg-neutral-200 rounded-2xl flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <p class="text-neutral-500">خريطة تفاعلية لجميع فروعنا</p>
              <p class="text-sm text-neutral-400 mt-2">يمكن إضافة Google Maps هنا</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ContactPageComponent {
  formData: ContactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  branches: Branch[] = [
    {
      id: 1,
      name: 'فرع المعادي',
      address: 'شارع 9، المعادي، القاهرة',
      phone: '02-25555555',
      whatsapp: '201012345678',
      workingHours: '10:00 ص - 2:00 ص',
      mapUrl: '',
      image: 'assets/branches/maadi-branch.jpg'
    },
    {
      id: 2,
      name: 'فرع مدينة نصر',
      address: 'شارع عباس العقاد، مدينة نصر، القاهرة',
      phone: '02-26666666',
      whatsapp: '201012345679',
      workingHours: '10:00 ص - 2:00 ص',
      mapUrl: '',
      image: 'assets/branches/nasr-city-branch.jpg'
    },
    {
      id: 3,
      name: 'فرع الإسكندرية',
      address: 'كورنيش الإسكندرية، سيدي جابر',
      phone: '03-33333333',
      whatsapp: '201012345680',
      workingHours: '10:00 ص - 2:00 ص',
      mapUrl: '',
      image: 'assets/branches/alexandria-branch.jpg'
    },
    {
      id: 4,
      name: 'فرع الزمالك',
      address: 'شارع 26 يوليو، الزمالك، القاهرة',
      phone: '02-27777777',
      whatsapp: '201012345681',
      workingHours: '10:00 ص - 2:00 ص',
      mapUrl: '',
      image: 'assets/branches/zamalek-branch.jpg'
    },
    {
      id: 5,
      name: 'فرع التجمع الخامس',
      address: 'التجمع الخامس، القاهرة الجديدة',
      phone: '02-28888888',
      whatsapp: '201012345682',
      workingHours: '10:00 ص - 2:00 ص',
      mapUrl: '',
      image: 'assets/branches/new-cairo-branch.jpg'
    },
    {
      id: 6,
      name: 'فرع الجيزة',
      address: 'شارع الهرم، الجيزة',
      phone: '02-29999999',
      whatsapp: '201012345683',
      workingHours: '10:00 ص - 2:00 ص',
      mapUrl: '',
      image: 'assets/branches/giza-branch.jpg'
    }
  ];

  onSubmit() {
    if (this.isFormValid()) {
      // Simulate form submission
      alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
      this.resetForm();
    }
  }

  private isFormValid(): boolean {
    return !!(this.formData.name && 
              this.formData.email && 
              this.formData.phone && 
              this.formData.subject && 
              this.formData.message);
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }
}
