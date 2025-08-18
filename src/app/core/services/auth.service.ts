import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  branchId?: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expiresAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'zawy_auth_token';
  private readonly USER_KEY = 'zawy_user';
  
  public currentUser = signal<User | null>(null);
  public isAuthenticated = signal<boolean>(false);
  
  private tokenExpirationTimer?: any;
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initializeAuth();
  }
  
  private initializeAuth(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const user = localStorage.getItem(this.USER_KEY);
    
    if (token && user) {
      try {
        const userObj = JSON.parse(user);
        this.currentUser.set(userObj);
        this.isAuthenticated.set(true);
        this.setTokenExpirationTimer();
      } catch {
        this.logout();
      }
    }
  }
  
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          this.handleLoginSuccess(response);
        })
      );
  }
  
  private handleLoginSuccess(response: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    
    this.currentUser.set(response.user);
    this.isAuthenticated.set(true);
    
    this.setTokenExpirationTimer();
  }
  
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    
    this.router.navigate(['/admin/login']);
  }
  
  private setTokenExpirationTimer(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000;
        const currentTime = Date.now();
        
        if (expirationTime > currentTime) {
          const timeUntilExpiry = expirationTime - currentTime;
          this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
          }, timeUntilExpiry);
        } else {
          this.logout();
        }
      } catch {
        this.logout();
      }
    }
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  hasRole(role: string): boolean {
    return this.currentUser()?.role === role;
  }
  
  isAdmin(): boolean {
    return this.hasRole('admin');
  }
}
