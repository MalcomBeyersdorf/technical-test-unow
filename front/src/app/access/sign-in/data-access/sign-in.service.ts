import { startWith, Subject, switchMap, of } from 'rxjs';
import { computed, effect, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SecurityService } from '../../../shared/services/security.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private readonly securityService: SecurityService = inject(SecurityService);

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  $userData = computed(() => this.securityService.$userData());
  $status = computed(() => this.securityService.$status());
  $error = computed(() => this.securityService.$error());

  signIn$ = new Subject<void>();

  constructor() {
    this.signIn$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.securityService.signIn$.next(this.signInForm.value);
    });
  }
}
