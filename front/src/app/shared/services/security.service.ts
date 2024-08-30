import { startWith, Subject, switchMap, of, retry, tap } from 'rxjs';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CookieHelper } from '../utils/cookie.helper';
import { SecurityApiService } from './apis/api.service';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private readonly apiService: SecurityApiService = inject(SecurityApiService);
  private readonly cookieHelper: CookieHelper = inject(CookieHelper);

  private $state = signal<any>({
    data: [],
    status: 'loading',
    error: null,
  });

  $data = computed(() => this.$state().data);
  $status = computed(() => this.$state().status);
  $error = computed(() => this.$state().error);

  retry$ = new Subject<void>();
  private dataLoaded$ = this.retry$.pipe(
    startWith(null),
    switchMap(() => {
      const token = this.cookieHelper.getCookie('token');
      if (token && this.cookieHelper.isTokenValid(token)) {
        return of(token);
      } else {
        return this.apiService.signIn().pipe(
          tap((response) => {
            this.$state.update((state) => ({ ...state, status: 'success' }));
            this.cookieHelper.setCookie('token', response.token);
          }),
          retry({
            delay: (error) => {
              this.$state.update((state) => ({ ...state, error, status: 'error' }));
              return this.retry$;
            },
          }),
        );
      }
    }),
  );
  action$ = new Subject<any>();
  signOut$ = new Subject<void>();

  constructor() {
    this.dataLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (response: any) => {
        this.$state.update((state) => ({
          ...state,
          data: response.data,
          status: 'success',
        }));
      },
      error: (error) => this.$state.update((state) => ({ ...state, error, status: 'error' })),
    });

    this.action$.pipe(takeUntilDestroyed()).subscribe((subjectReceived: any) => {
      if (subjectReceived) {
        // do something
      } else {
        // do something
      }
    });

    this.retry$.pipe(takeUntilDestroyed()).subscribe(() => this.$state.update((state) => ({ ...state, status: 'loading' })));

    effect(() => {});
  }
}
