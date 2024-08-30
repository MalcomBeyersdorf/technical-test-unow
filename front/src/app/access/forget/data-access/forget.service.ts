import { Subject } from 'rxjs';
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SecurityService } from '../../../shared/services/security.service';

@Injectable({
  providedIn: 'root',
})
export class ForgetService {
  private readonly securityService: SecurityService = inject(SecurityService);

  private $state = signal<any>({
    status: 'loading',
    error: null,
  });

  $status = computed(() => this.$state().status);
  $error = computed(() => this.$state().error);

  action$ = new Subject<any>();

  constructor() {
    this.action$.pipe(takeUntilDestroyed()).subscribe((email: any) => {
      this.securityService.action$.next(email);
    });
  }
}
