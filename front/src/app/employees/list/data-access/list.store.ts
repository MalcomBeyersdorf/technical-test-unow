import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LOCAL_STORAGE } from '../../../shared/injections/local-storage.injection';

@Injectable({
  providedIn: 'root',
})
export class ListStore {
  storage = inject(LOCAL_STORAGE);

  loadData(): Observable<any[]> {
    const data = this.storage.getItem('list');
    return of(data ? (JSON.parse(data) as any[]) : []);
  }

  saveData(data: any[]): void {
    this.storage.setItem('list', JSON.stringify(data));
  }
}

