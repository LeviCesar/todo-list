import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;
  private authService = inject(AuthService);

  addTask(description: string): Observable<string | null> {
    const payload = { description };

    return this.authService.hasValidToken().pipe(
      switchMap((isValid) => {
        if (!isValid) return of(null);

        return this.http.post<{ id: string }>(`${this.url}/api/task`, payload, {
          headers: {
            Authorization: `Bearer ${this.authService.getToken()}`
          }
        }).pipe(
          map(response => response.id),
          catchError(() => of(null))
        );
      })
    );
  }

  removeTask(id: string): Observable<any> {
    return this.http.delete(`${this.url}/api/task/${id}`, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken(),
      }
    });
  }

  getTasks(): Observable<{ id: string, text: string, status: boolean }[]> {
    return this.http.get<{ id: string, text: string, status: boolean }[]>(
      this.url + '/api/task',
      {
        headers: {
          Authorization: 'Bearer ' + this.authService.getToken(),
        },
      }
    );
  }

  statusTask(id: string, status: boolean): Observable<{ status: boolean }> {
    return this.http.patch<{ status: boolean }>(
      `${this.url}/api/task/${id}/status`,
      { status },
      {
        headers: {
          Authorization: 'Bearer ' + this.authService.getToken(),
        },
      }
    );
  }
}
