import { Subject } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SecurityService } from '../../../shared/services/security.service';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private readonly securityService: SecurityService = inject(SecurityService);

  action$ = new Subject<any>();

  constructor() {
    this.action$.pipe(takeUntilDestroyed()).subscribe((subjectReceived: any) => {
      if (subjectReceived) {
        // do something
      } else {
        // do something
      }
    });
  }
}
