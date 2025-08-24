import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Public Routes
  {
    path: '',
    loadComponent: () => import('./views/home/home.component').then(m => m.HomeComponent),
    title: 'الزاوي - الصفحة الرئيسية'
  },
  {
    path: 'menu',
    loadComponent: () => import('./views/menu/menu.component').then(m => m.MenuComponent),
    title: 'الزاوي - القائمة'
  },
  {
    path: 'offers',
    loadComponent: () => import('./views/offers/offers.component').then(m => m.OffersComponent),
    title: 'الزاوي - العروض'
  },
  {
    path: 'contact',
    loadComponent: () => import('./views/contact/contact.component').then(m => m.ContactComponent),
    title: 'الزاوي - اتصل بنا'
  },
  {
    path: 'about',
    loadComponent: () => import('./views/about/about.component').then(m => m.AboutComponent),
    title: 'الزاوي - من نحن'
  },
  {
    path: 'cart',
    loadComponent: () => import('./views/cart/cart.component').then(m => m.CartComponent),
    title: 'الزاوي - سلة التسوق'
  },
  
  // Admin Routes
  {
    path: 'admin/login',
    loadComponent: () => import('./features/admin/login/login.component').then(m => m.LoginComponent),
    title: 'الزاوي - تسجيل الدخول'
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./features/admin/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'الزاوي - لوحة التحكم'
      },
      {
        path: 'branches',
        loadComponent: () => import('./features/admin/branches/branches.component').then(m => m.BranchesComponent),
        title: 'الزاوي - إدارة الفروع'
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/admin/categories/categories.component').then(m => m.CategoriesComponent),
        title: 'الزاوي - إدارة الفئات'
      },
      {
        path: 'menu-items',
        loadComponent: () => import('./features/admin/menu-items/menu-items.component').then(m => m.MenuItemsComponent),
        title: 'الزاوي - إدارة عناصر القائمة'
      },
      {
        path: 'offers',
        loadComponent: () => import('./features/admin/offers/offers.component').then(m => m.OffersComponent),
        title: 'الزاوي - إدارة العروض'
      },
      {
        path: 'users',
        loadComponent: () => import('./features/admin/users/users.component').then(m => m.UsersComponent),
        title: 'الزاوي - إدارة المستخدمين'
      }
    ]
  },
  
  // 404 Page
  {
    path: '**',
    loadComponent: () => import('./features/public/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'الزاوي - الصفحة غير موجودة'
  }
];
