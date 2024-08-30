import { Routes } from '@angular/router';
import { authenticationGuard } from './shared/guards/authentication.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/access', pathMatch: 'full' },
  {
    path: 'access',
    loadChildren: () => import('./access/access.routes').then((m) => m.ACCESS_ROUTES),
  },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.routes').then((m) => m.EMPLOYEES_ROUTES),
    canActivate: [authenticationGuard],
  },
  { path: '**', redirectTo: '' },
];
