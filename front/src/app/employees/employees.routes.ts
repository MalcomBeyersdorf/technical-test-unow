import { Routes } from '@angular/router';
import { ListComponent } from './list/feature/list.component';
import { DetailComponent } from './detail/feature/detail.component';
import { authenticationGuard } from '../shared/guards/authentication.guard';

export const EMPLOYEES_ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'detail',
    component: DetailComponent,
    canActivate: [authenticationGuard],
  },
];
