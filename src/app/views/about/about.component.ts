import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">من نحن</h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto">قصتنا، رحلتنا، وقيمنا التي تجعل من مطعمنا فريدًا</p>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="md:w-1/2">
            <img src="assets/images/restaurant-interior.jpg" alt="مطعمنا" class="rounded-2xl shadow-xl w-full h-auto">
          </div>
          <div class="md:w-1/2">
            <h2 class="text-3xl font-bold text-neutral-800 mb-6">قصتنا</h2>
            <p class="text-lg text-neutral-600 mb-6 leading-relaxed">
              تأسس مطعمنا عام 2010 بمزيج فريد من الأصالة والحداثة. نقدم ألذ الأطباق المصنوعة من أفضل المكونات الطازجة التي يتم اختيارها بعناية لنضمن لزبائننا تجربة طعام لا تُنسى.
            </p>
            <p class="text-lg text-neutral-600 mb-8 leading-relaxed">
              نسعى دائمًا لتقديم تجربة طعام استثنائية تجمع بين النكهات الشرقية الأصيلة والتقديم العصري الراقي.
            </p>
            <div class="grid grid-cols-2 gap-8">
              <div class="text-center">
                <span class="text-4xl font-bold text-primary">10+</span>
                <p class="text-neutral-600">سنوات من الخبرة</p>
              </div>
              <div class="text-center">
                <span class="text-4xl font-bold text-primary">50+</span>
                <p class="text-neutral-600">طبق مميز</p>
              </div>
              <div class="text-center">
                <span class="text-4xl font-bold text-primary">1000+</span>
                <p class="text-neutral-600">عميل سعيد</p>
              </div>
              <div class="text-center">
                <span class="text-4xl font-bold text-primary">24/7</span>
                <p class="text-neutral-600">خدمة عملاء</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Values -->
    <section class="py-16 bg-neutral-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-neutral-800 mb-4">قيمنا</h2>
          <div class="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl text-primary">🌟</span>
            </div>
            <h3 class="text-xl font-bold text-neutral-800 mb-3">الجودة</h3>
            <p class="text-neutral-600">نلتزم بأعلى معايير الجودة في اختيار المكونات وإعداد الأطباق</p>
          </div>
          
          <div class="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl text-primary">❤️</span>
            </div>
            <h3 class="text-xl font-bold text-neutral-800 mb-3">الرضا التام</h3>
            <p class="text-neutral-600">نسعى دائمًا لتحقيق رضا عملائنا الكرام وتجربة لا تُنسى</p>
          </div>
          
          <div class="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl text-primary">✨</span>
            </div>
            <h3 class="text-xl font-bold text-neutral-800 mb-3">الابتكار</h3>
            <p class="text-neutral-600">نبتكر باستمرار لنقدم لكم أطباقًا فريدة تجمع بين الأصالة والحداثة</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Team -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-neutral-800 mb-4">فريقنا</h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">تعرف على الطهاة المحترفين الذين يصنعون تجربة طعام لا تُنسى</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div *ngFor="let member of teamMembers" class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <img [src]="member.image" [alt]="member.name" class="w-full h-80 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-bold text-neutral-800">{{ member.name }}</h3>
              <p class="text-primary font-medium mb-3">{{ member.role }}</p>
              <p class="text-neutral-600">{{ member.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-primary text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-6">جرب تجربة طعام لا تُنسى معنا</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">احجز طاولتك الآن واستمتع بأجواء راقية وأطباق لذيذة</p>
        <a routerLink="/contact" class="inline-block bg-white text-primary font-bold px-8 py-3 rounded-lg hover:bg-neutral-100 transition-colors">
          احجز الآن
        </a>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AboutComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'أحمد محمد',
      role: 'الشيف التنفيذي',
      image: 'assets/team/chef1.jpg',
      description: 'يتمتع بخبرة تزيد عن 15 عامًا في عالم الطهي، متخصص في المأكولات الشرقية الأصيلة.'
    },
    {
      name: 'سارة خالد',
      role: 'شيف الحلويات',
      image: 'assets/team/chef2.jpg',
      description: 'خبيرة في صنع ألذ الحلويات الشرقية والغربية بتصميمات إبداعية تجمع بين الطعم والجمال.'
    },
    {
      name: 'علي حسن',
      role: 'مدير المطعم',
      image: 'assets/team/manager.jpg',
      description: 'يحرص على تقديم أفضل تجربة خدمة عملاء مع ضمان أعلى معايير الجودة والتميز.'
    }
  ];
}
