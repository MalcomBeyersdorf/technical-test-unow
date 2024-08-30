import { startWith, Subject, switchMap, of } from 'rxjs';
import { computed, effect, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SecurityService } from '../../../shared/services/security.service';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private readonly securityService: SecurityService = inject(SecurityService);

  $data = computed(() => this.securityService.$data());
  $status = computed(() => this.securityService.$status());
  $error = computed(() => this.securityService.$error());

  retry$ = new Subject<void>();
  private dataLoaded$ = this.retry$.pipe(
    startWith(null),
    switchMap(
      () => of(console.log('api request')),
      /*
            this.apiService.get().pipe(
              retry({
                delay: error => {
                  this.$state.update(state => ({ ...state, error, status: 'error' }));
                  return this.retry$;
                },
              }),
            ),
            */
    ),
  );
  action$ = new Subject<any>();

  constructor() {
    this.dataLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (response: any) => {
        /*
              this.$state.update(state => ({
                ...state,
                data: response.data,
                status: 'success',
              }));
            */
      },
    });

    this.action$.pipe(takeUntilDestroyed()).subscribe((subjectReceived: any) => {
      if (subjectReceived) {
        // do something
      } else {
        // do something
      }
    });

    // this.retry$.pipe(takeUntilDestroyed()).subscribe(() => this.$state.update((state) => ({ ...state, status: 'loading' })));

    effect(() => {});
  }
}
