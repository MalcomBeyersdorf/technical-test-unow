import { Component, inject } from '@angular/core';
import { SignUpService } from '../data-access/sign-up.service';
import { APP_PRIMENG_MODULE } from '../../../shared/utils/prime.imports';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [APP_PRIMENG_MODULE, ReactiveFormsModule, MessagesModule],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  readonly service: SignUpService = inject(SignUpService);
  readonly location: Location = inject(Location);

  handleSubmit() {
    if (this.service.registerForm.valid) {
      this.service.signUp$.next();
    } else {
      this.service.registerForm.markAllAsTouched();
    }
  }

  get email() {
    return this.service.registerForm.get('email');
  }

  get password() {
    return this.service.registerForm.get('password');
  }

  get confirmPassword() {
    return this.service.registerForm.get('confirmPassword');
  }

  get firstName() {
    return this.service.registerForm.get('firstName');
  }

  get lastName() {
    return this.service.registerForm.get('lastName');
  }

  get job() {
    return this.service.registerForm.get('job');
  }

  get birthDate() {
    return this.service.registerForm.get('birthDate');
  }
}
