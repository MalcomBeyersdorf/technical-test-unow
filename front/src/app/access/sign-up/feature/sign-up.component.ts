import { Component, inject } from '@angular/core';
import { SignUpService } from '../data-access/sign-up.service';
import { APP_PRIMENG_MODULE } from '../../../shared/utils/prime.imports';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [APP_PRIMENG_MODULE],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  private readonly service: SignUpService = inject(SignUpService);
  readonly location: Location = inject(Location);

  handleSubmit() {
    console.log('submit');
  }
}
