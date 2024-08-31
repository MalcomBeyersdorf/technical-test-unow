import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_PRIMENG_MODULE } from './shared/utils/prime.imports';
import { SecurityService } from './shared/services/security.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

//NOTE: El if separa al usuario logeado del que no para mostrar el p-menu,
// la forma correcta de hacer esto seria agregar un layout/shell para la app y dejar este componente limpio
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, APP_PRIMENG_MODULE, ToastModule],
  providers: [MessageService],
  template: `
    @if (securityService.$userData()) {
      <div class="card">
        <p-menubar [model]="[]">
          <ng-template pTemplate="end">
            <div class="flex align-items-center gap-2">
              <p-menu #menu [model]="options" [popup]="true" />
              <p-button (click)="menu.toggle($event)" [rounded]="true" [text]="true" label="Nombre del usuario" />
              <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
            </div>
          </ng-template>
        </p-menubar>
      </div>
      <router-outlet />
    } @else {
      <router-outlet />
    }
    <p-toast [life]="3000" />
  `,
})
export class AppComponent {
  readonly messageService = inject(MessageService);
  readonly securityService = inject(SecurityService);
  readonly options = [
    {
      label: 'Opciones',
      items: [
        {
          label: 'Salir',
          icon: 'pi pi-sign-out',
          command: () => {
            this.securityService.signOut$.next();
          },
        },
      ],
    },
  ];
  _effect = effect(() => {
    this.securityService.checkServer$.next();
    if (this.securityService.$serverStatus()) {
      this.messageService.add({ severity: 'info', summary: 'Server status:', detail: this.securityService.$serverStatus() });
    }
  });
}
