import { Routes } from '@angular/router';
import { authenticationGuard } from './shared/guards/authentication.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./employees/employees.routes').then((m) => m.EMPLOYEES_ROUTES),
    canActivate: [authenticationGuard],
  },
  { path: '**', redirectTo: '' },
];
