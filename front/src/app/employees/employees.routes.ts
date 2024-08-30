import { Routes } from '@angular/router';
import { ListComponent } from './list/feature/list.component';
import { DetailComponent } from './detail/feature/detail.component';

export const EMPLOYEES_ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'detail',
    component: DetailComponent,
  },
];
