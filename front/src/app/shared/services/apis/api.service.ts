import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecurityApiService {
  private readonly http: HttpClient = inject(HttpClient);

  signIn(body?: any): Observable<any> {
    // return this.http.post<any>(this.getUrl('path'), body);
    return of({ user: 'user', token: 'token' });
  }

  signUp(body?: any): Observable<any> {
    // return this.http.post<any>(this.getUrl('path'), body);
    return of({ user: 'user', token: 'token' });
  }

  /**
   * Constructs a full API URL for a given path.
   * @param {string} path - The API path segment to append to the base URL.
   * @return {string} The full URL for the API endpoint.
   */
  private getUrl(path: string): string {
    return `api-path/${path}`;
  }
}
