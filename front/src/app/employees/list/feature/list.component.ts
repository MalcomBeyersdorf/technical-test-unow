import { Component, inject } from '@angular/core';
import { ListService } from '../data-access/list.service';
import { APP_PRIMENG_MODULE } from '../../../shared/utils/prime.imports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [APP_PRIMENG_MODULE],
  templateUrl: './list.component.html',
})
export class ListComponent {
  private readonly service: ListService = inject(ListService);
  private readonly router: Router = inject(Router);
  //TODO: viene de la api
  employees = [
    { firstName: 'code1', lastName: 'name1', job: 'cat1', birthDate: '10-10-1990' },
    { firstName: 'code2', lastName: 'name2', job: 'cat1', birthDate: '10-10-1990' },
    { firstName: 'code3', lastName: 'name3', job: 'cat1', birthDate: '10-10-1990' },
    { firstName: 'code4', lastName: 'name4', job: 'cat1', birthDate: '10-10-1990' },
    { firstName: 'code5', lastName: 'name5', job: 'cat1', birthDate: '10-10-1990' },
  ];

  createEmployee() {
    this.router.navigate(['/employees/detail/']);
  }

  seeEmployeeDetails(employee: any) {
    this.service.selectEmployee$.next(employee);
    this.router.navigate(['/employees/detail']);
  }
}
