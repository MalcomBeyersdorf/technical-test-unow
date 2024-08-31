import { Component, inject } from '@angular/core';
import { ListService } from '../data-access/list.service';
import { APP_PRIMENG_MODULE } from '../../../shared/utils/prime.imports';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [APP_PRIMENG_MODULE, DatePipe],
  templateUrl: './list.component.html',
})
export class ListComponent {
  readonly service: ListService = inject(ListService);
  private readonly router: Router = inject(Router);

  createEmployee() {
    this.router.navigate(['/employees/detail/']);
  }

  seeEmployeeDetails(employee: any) {
    this.service.selectEmployee$.next(employee);
  }
}
