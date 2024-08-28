import { Component, inject } from '@angular/core';
import { DetailService } from '../data-access/detail.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
})
export class DetailComponent {
  private readonly service: DetailService = inject(DetailService);
}

