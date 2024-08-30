import { Subject } from 'rxjs';
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DetailStore } from './detail.store';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  //private readonly apiService: ApiService = inject(ApiService);
  private readonly detailStore: DetailStore = inject(DetailStore);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  private $state = signal<any>({
    employee: null,
    status: 'loading',
    error: null,
  });

  employeeForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    puesto: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
  });

  $employee = computed(() => this.$state().employee);
  $isNewEmployee = computed(() => this.$state().employee == null || this.$state().employee == undefined);
  $status = computed(() => this.$state().status);
  $error = computed(() => this.$state().error);

  createEmployee$ = new Subject<any>();
  setSelectedEmployee$ = new Subject<any>();
  clearSelection$ = new Subject<void>();

  constructor() {
    this.setSelectedEmployee$.pipe(takeUntilDestroyed()).subscribe((data: any) => {
      console.log('data', data);
      this.$state.update((state) => ({ ...state, employee: data }));
    });

    this.createEmployee$.pipe(takeUntilDestroyed()).subscribe((data: any) => {
      console.log('Data para crear empleado', data);
    });

    this.clearSelection$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.$state.update((state) => ({ ...state, employee: null }));
    });
  }
}
