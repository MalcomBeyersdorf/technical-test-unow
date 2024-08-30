import { Component, inject } from '@angular/core';
import { SignInService } from '../data-access/sign-in.service';
import { Router } from '@angular/router';
import { APP_PRIMENG_MODULE } from '../../../shared/utils/prime.imports';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [APP_PRIMENG_MODULE],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  private readonly router: Router = inject(Router);
  private readonly service: SignInService = inject(SignInService);

  handleSubmit() {
    console.log('submit');
    this.router.navigate(['/', 'employees']);
  }

  goTo(path: string) {
    this.router.navigate(['access/', path]);
  }
}
