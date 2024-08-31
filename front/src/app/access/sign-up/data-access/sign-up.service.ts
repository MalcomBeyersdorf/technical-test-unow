import { of, retry, startWith, Subject, switchMap } from 'rxjs';
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SecurityService } from '../../../shared/services/security.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/apis/api.service';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private readonly securityService: SecurityService = inject(SecurityService);
  private readonly apiService: ApiService = inject(ApiService);

  private $state = signal<any>({
    jobTypes: [],
    status: 'loading',
    error: null,
  });

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    job: new FormControl('', [Validators.required]),
  });

  $jobTypes = computed(() => this.$state().jobTypes);
  $status = computed(() => this.$state().status);
  $error = computed(() => this.$state().error);
  $securityStatus = computed(() => this.securityService.$status());
  $securityError = computed(() => this.securityService.$error());

  signUp$ = new Subject<void>();

  retry$ = new Subject<void>();
  private jobTypesLoaded$ = this.retry$.pipe(
    startWith(null),
    switchMap(() =>
      this.apiService.getJobTypes().pipe(
        retry({
          delay: (error) => {
            this.$state.update((state) => ({ ...state, error, status: 'error' }));
            return this.retry$;
          },
        }),
      ),
    ),
  );

  constructor() {
    this.jobTypesLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (response: any) => {
        this.$state.update((state) => ({
          ...state,
          jobTypes: response.jobTypes.map((jobType: string) => ({
            label: jobType,
            value: jobType,
          })),
          status: 'success',
        }));
      },
      error: (error) => this.$state.update((state) => ({ ...state, error, status: 'error' })),
    });

    this.signUp$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.securityService.signUp$.next(this.registerForm.value);
    });
  }
}
