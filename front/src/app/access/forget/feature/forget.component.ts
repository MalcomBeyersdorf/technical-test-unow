import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ForgetService } from '../data-access/forget.service';
import { APP_PRIMENG_MODULE } from '../../../shared/utils/prime.imports';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [APP_PRIMENG_MODULE],
  template: `
    <div class="flex justify-content-center align-items-center min-h-screen">
      <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <p-button (click)="location.back()" icon="pi pi-chevron-left" [rounded]="true" [text]="true" severity="primary" />
        <div class="text-center mb-5">
          <div class="text-900 text-3xl font-medium mb-3">Recupera tu cuenta</div>
        </div>
        <div>
          <label for="email" class="block text-900 font-medium mb-2">Email vinculado a la cuenta</label>
          <input id="email" type="text" placeholder="usuario@dominio.com" pInputText class="w-full mb-3" />
          <button pButton pRipple (click)="submit()" label="Enviar correo" icon="pi pi-user" class="w-full"></button>
        </div>
      </div>
    </div>
  `,
})
export class ForgetComponent {
  readonly location = inject(Location);
  private readonly service: ForgetService = inject(ForgetService);

  submit() {
    this.service.action$.next('');
  }
}
