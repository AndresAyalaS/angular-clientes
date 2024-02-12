import { Routes } from '@angular/router';
import { ListClienteComponent } from './components/list-cliente/list-cliente.component';
import { FormClienteComponent } from './components/form-cliente/form-cliente.component';

export const routes: Routes = [
  { path: '', component: ListClienteComponent },
  { path: 'agregar', component: FormClienteComponent },
  { path: 'editar/:id', component: FormClienteComponent },
];
