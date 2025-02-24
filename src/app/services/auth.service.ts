import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, AuthResponse } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/api/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.setUserFromToken(response.token);
        })
      );
  }

  signup(username: string, password: string, firstName: string, lastName: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/register`, {
      username,
      password,
      firstName,
      lastName
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  private checkToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.setUserFromToken(token);
    }
  }

  private setUserFromToken(token: string): void {
    try {
      const decoded: any = jwtDecode(token);
      const user: User = {
        id: decoded.id,
        username: decoded.sub,
        firstName: decoded.firstName,
        role: decoded.roles
      };
      this.currentUserSubject.next(user);
    } catch (error) {
      console.error('Error decoding token:', error);
      this.logout();
    }
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'ROLE_ADMIN';
  }
}