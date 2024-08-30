import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/feature/sign-up.component';
import { SignInComponent } from './sign-in/feature/sign-in.component';
import { ForgetComponent } from './forget/feature/forget.component';

export const ACCESS_ROUTES: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'forget',
    component: ForgetComponent,
  },
];
