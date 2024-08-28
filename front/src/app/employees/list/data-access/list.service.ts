import { startWith, Subject, switchMap, of } from 'rxjs';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ListStore } from './list.store';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  //private readonly apiService: ApiService = inject(ApiService);
  private readonly listStore: ListStore = inject(ListStore);

  private $state = signal<any>({
    data: [],
    status: 'loading',
    error: null,
  });

  $data = computed(() => this.$state().data);
  $status = computed(() => this.$state().status);
  $error = computed(() => this.$state().error);

  retry$ = new Subject<void>();
  private dataLoaded$ = this.retry$.pipe(
    startWith(null),
    switchMap(
      () => of(console.log('api request')),
      /*
            this.apiService.get().pipe(
              retry({
                delay: error => {
                  this.$state.update(state => ({ ...state, error, status: 'error' }));
                  return this.retry$;
                },
              }),
            ),
            */
    ),
  );
  action$ = new Subject<any>();

  constructor() {
    this.dataLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (response: any) => {
        /*
              this.$state.update(state => ({
                ...state,
                data: response.data,
                status: 'success',
              }));
            */
      },
      error: (error) =>
        this.$state.update((state) => ({ ...state, error, status: 'error' })),
    });

    this.action$
      .pipe(takeUntilDestroyed())
      .subscribe((subjectReceived: any) => {
        if (subjectReceived) {
          // do something
        } else {
          // do something
        }
      });

    this.retry$
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.$state.update((state) => ({ ...state, status: 'loading' })),
      );

    effect(() => {
      if (this.$state().status === 'success') {
        this.listStore.saveData(this.$data());
      }
    });
  }
}
