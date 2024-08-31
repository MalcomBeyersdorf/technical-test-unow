import { startWith, Subject, switchMap, of, lastValueFrom } from 'rxjs';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CookieHelper } from '../utils/cookie.helper';
import { ApiService } from './apis/api.service';
import { Router } from '@angular/router';
import { SecurityStore } from './stores/security.store';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private readonly router: Router = inject(Router);
  private readonly store: SecurityStore = inject(SecurityStore);
  private readonly apiService: ApiService = inject(ApiService);
  private readonly cookieHelper: CookieHelper = inject(CookieHelper);

  private $state = signal<any>({
    userData: undefined,
    token: '',
    status: 'loading',
    serverStatus: undefined,
    error: null,
  });

  $userData = computed(() => this.$state().userData);
  $token = computed(() => this.$state().token);
  $serverStatus = computed(() => this.$state().serverStatus);
  $status = computed(() => this.$state().status);
  $error = computed(() => this.$state().error);

  retry$ = new Subject<void>();
  private dataLoaded$ = this.retry$.pipe(
    startWith(null),
    switchMap(() => {
      // TODO: Tomar de localStorage
      const token = this.cookieHelper.getCookie('token');
      if (token && this.cookieHelper.isTokenValid(token)) {
        return of(token);
      } else return of(this.signOut$.next());
    }),
  );
  checkServer$ = new Subject<void>();
  signOut$ = new Subject<void>();
  // TODO: tipar
  signIn$ = new Subject<any>();
  signUp$ = new Subject<any>();

  constructor() {
    this.dataLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (token: any) => {
        this.$state.update((state) => ({
          ...state,
          userData: {},
          token: token,
          status: 'success',
        }));
      },
      error: (error) => this.$state.update((state) => ({ ...state, error, status: 'error' })),
    });

    this.signOut$.pipe(takeUntilDestroyed()).subscribe(async () => {
      this.$state.update((state) => ({
        ...state,
        userData: undefined,
        status: 'success',
      }));
    });

    this.signIn$
      .pipe(
        takeUntilDestroyed(),
        switchMap((body) => this.apiService.signIn(body)),
      )
      .subscribe({
        next: (response) => {
          this.$state.update((state) => ({
            ...state,
            userData: response.userData,
            token: response.token,
            status: 'success',
          }));
          this.router.navigate(['employees/']);
        },
        error: (error) => {
          this.$state.update((state) => ({
            ...state,
            error: error,
            status: 'error',
          }));
        },
      });

    this.signUp$
      .pipe(
        takeUntilDestroyed(),
        switchMap((body) => this.apiService.signUp(body)),
      )
      .subscribe({
        next: (response) => {
          this.$state.update((state) => ({
            ...state,
            userData: response.userData,
            token: response.token,
            status: 'success',
          }));
          this.router.navigate(['employees/']);
        },
        error: (error) => {
          this.$state.update((state) => ({
            ...state,
            error: error,
            status: 'error',
          }));
        },
      });

    this.checkServer$.pipe(takeUntilDestroyed()).subscribe(async () => {
      const response = await lastValueFrom(this.apiService.healthz());
      this.$state.update((state) => ({
        ...state,
        serverStatus: response.message,
        status: 'success',
      }));
    });

    this.retry$.pipe(takeUntilDestroyed()).subscribe(() => this.$state.update((state) => ({ ...state, status: 'loading' })));
    effect(() => {
      if (this.$state().status == 'success') this.store.saveData(this.$state().token);
    });
  }
}
