import { Component, inject } from '@angular/core';
import { ListService } from '../data-access/list.service';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
})
export class ListComponent {
  private readonly service: ListService = inject(ListService);
}

