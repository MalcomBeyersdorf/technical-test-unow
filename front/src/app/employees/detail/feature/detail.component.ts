import { Component, inject } from '@angular/core';
import { DetailService } from '../data-access/detail.service';
import { APP_PRIMENG_MODULE } from '../../../shared/utils/prime.imports';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ReactiveFormsModule, APP_PRIMENG_MODULE],
  templateUrl: './detail.component.html',
})
export class DetailComponent {
  private readonly location: Location = inject(Location);
  readonly service: DetailService = inject(DetailService);

  handleSubmit() {
    console.log('ss');
  }

  return() {
    this.service.clearSelection$.next();
    this.location.back();
  }
}
