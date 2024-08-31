import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

// NOTE: esto se podria separa en varios archivos de ser necesario
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);

  healthz(): Observable<any> {
    return this.http.get<any>(this.getUrl('healthz')).pipe(catchError(this.handleError));
  }

  getEmployees(): Observable<{ jobTypes: string[] }> {
    return this.http.get<{ jobTypes: string[] }>(this.getUrl('employees')).pipe(catchError(this.handleError));
  }

  getJobTypes(): Observable<{ jobTypes: string[] }> {
    return this.http.get<{ jobTypes: string[] }>(this.getUrl('jobs/types')).pipe(catchError(this.handleError));
  }

  signIn(body: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.getUrl('security/sign-in'), body).pipe(catchError(this.handleError));
  }

  signUp(body?: any): Observable<any> {
    return this.http.post<any>(this.getUrl('security/sign-up'), body).pipe(catchError(this.handleError));
  }

  /**
   * Handles HTTP errors by generating an appropriate error message.
   *
   * This method processes an `HttpErrorResponse` object and extracts error details.
   * It distinguishes between client-side and server-side errors to generate a meaningful
   * error message. Client-side errors are typically network or other errors
   * occurring before the HTTP request is made. Server-side errors are those returned
   * by the server and include HTTP status codes and error messages.
   *
   * @param error - The `HttpErrorResponse` object containing error details from the HTTP request.
   *
   * @returns An observable that emits a user-friendly error message.
   * The error message can be consumed by error handling logic in components or services.
   *
   * @example
   * ```typescript
   * this.http.get<Data>(url).pipe(
   *   catchError(this.handleError)
   * ).subscribe(data => {
   *   // Handle the data
   * }, error => {
   *   // Handle the error message
   *   console.error(error);
   * });
   * ```
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    console.log('error completo', error);
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.statusText}`;
    }
    return throwError(() => errorMessage);
  }

  /**
   * Constructs a full API URL for a given path.
   * @param {string} path - The API path segment to append to the base URL.
   * @return {string} The full URL for the API endpoint.
   */
  private getUrl(path: string): string {
    return `http://localhost:3000/${path}`;
  }
}
