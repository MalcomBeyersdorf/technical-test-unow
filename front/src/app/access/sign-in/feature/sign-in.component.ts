import { Component, effect, inject } from '@angular/core';
import { SignInService } from '../data-access/sign-in.service';
import { Router } from '@angular/router';
import { APP_PRIMENG_MODULE } from '../../../shared/utils/prime.imports';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, APP_PRIMENG_MODULE],
  templateUrl: './sign-in.component.html',
  styles: `
    .pi-spinner {
      font-size: 1.5rem;
      vertical-align: middle;
    }
  `,
})
export class SignInComponent {
  private readonly router: Router = inject(Router);
  readonly service: SignInService = inject(SignInService);
  readonly messageService = inject(MessageService);

  handleSubmit() {
    if (this.service.signInForm.valid) {
      this.service.signIn$.next();
    } else {
      this.service.signInForm.markAllAsTouched();
    }
  }

  goTo(path: string) {
    this.router.navigate(['access/', path]);
  }

  get email() {
    return this.service.signInForm.get('email')!;
  }

  get password() {
    return this.service.signInForm.get('password')!;
  }

  _effect = effect(() => {
    switch (this.service.$status()) {
      case 'success':
        this.router.navigate(['employees/list']);
        break;
      case 'error':
        this.messageService.add({ severity: 'error', summary: 'Error:', detail: this.service.$error() });
        break;

      default:
        break;
    }
  });
}
