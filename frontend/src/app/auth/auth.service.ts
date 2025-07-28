import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of, catchError, map, tap } from 'rxjs';
import { toZonedTime } from 'date-fns-tz';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;

  registerUser(email: string, password: string): Observable<object> {
    return this.http.post(`${this.url}/api/users`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/api/auth/token`, { email, password }).pipe(
      tap((res: any) => {
        this.saveToken(res.access_token);
        this.saveRefreshToken(res.refresh_token);
      })
    );
  }

  refreshSession(refreshToken: string): Observable<boolean> {
    return this.http.post(`${this.url}/api/auth/refresh`, { refresh: refreshToken }).pipe(
      tap((res: any) => {
        this.saveToken(res.access_token);
      }),
      map(() => true),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  saveRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  isTokenValid(token: string): boolean {
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload?.exp;
      if (!exp) return false;

      const timeZone = 'Europe/London';
      const now = toZonedTime(new Date(), timeZone);
      const nowInSeconds = Math.floor(now.getTime() / 1000);

      return exp > nowInSeconds;
    } catch (err) {
      return false;
    }
  }

  hasValidToken(): Observable<boolean> {
    const token = this.getToken();
    const refreshToken = this.getRefreshToken();

    if (token && this.isTokenValid(token)) {
      return of(true);
    }

    if (refreshToken && this.isTokenValid(refreshToken)) {
      return this.refreshSession(refreshToken);
    }

    this.logout();
    return of(false);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
