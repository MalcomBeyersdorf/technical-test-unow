import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LOCAL_STORAGE } from '../../injections/local-storage.injection';

@Injectable({
  providedIn: 'root',
})
export class SecurityStore {
  storage = inject(LOCAL_STORAGE);

  loadData(): Observable<any> {
    const data = this.storage.getItem('security');
    return of(data ? (JSON.parse(data) as any) : {});
  }

  saveData(data: any): void {
    this.storage.setItem('security', JSON.stringify(data));
  }
}
