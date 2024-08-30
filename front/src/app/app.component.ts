import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_PRIMENG_MODULE } from './shared/utils/prime.imports';
import { SecurityService } from './shared/services/security.service';

//NOTE: El if separa al usuario logeado del que no para mostrar el p-menu,
// la forma correcta de hacer esto seria agregar un layout/shell para la app y dejar este componente limpio
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, APP_PRIMENG_MODULE],
  template: `
    @if (securityService.$data()) {
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
  `,
})
export class AppComponent {
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
}
