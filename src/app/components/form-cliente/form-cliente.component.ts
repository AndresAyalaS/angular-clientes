import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClientesService } from '../../service/cliente.service';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './form-cliente.component.html',
  styleUrl: './form-cliente.component.css',
})
export class FormClienteComponent implements OnInit {
  items: any[] = [];
  newItemId: any = '';
  newItemKey = '';
  newItemNombre = '';
  newItemEmail = '';
  newItemTelefono = '';
  newItemFechaIngreso = '';
  nombreForm = '';
  btnReset = false

  constructor(
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.nombreForm = 'Editar cliente';
    } else {
      this.nombreForm = 'Crear un nuevo cliente';
    }
    this.activatedRoute.params.subscribe((params: any) => {
      this.newItemId = null;
      if (params.id) {
        this.clientesService.getItemById(params.id).subscribe({
          next: (item: any) => {
            this.newItemId = item?.id;
            this.newItemKey = item?.usuario_key;
            this.newItemNombre = item?.nombre;
            this.newItemEmail = item?.email;
            this.newItemTelefono = item?.telefono;
            this.newItemFechaIngreso = item?.fecha_ingreso;
          },
          error: (e) => {
            console.error(e);
          },
        });
      }
    });
  }

  enviarItem(): void {
    if (this.newItemId) {
      this.editItem();
    } else {
      this.addItem();
    }
  }

  addItem(): void {
    this.clientesService
      .createItem({
        nombre: this.newItemNombre,
        usuario_key: this.newItemKey,
        email: this.newItemEmail,
        telefono: this.newItemTelefono,
        fecha_ingreso: this.newItemFechaIngreso,
      })
      .subscribe(() => {
        this.newItemId = '';
        this.newItemNombre = '';
        this.newItemKey = '';
        this.newItemEmail = '';
        this.newItemTelefono = '';
        this.newItemFechaIngreso = '';
      });
  }

  editItem(): void {
    this.clientesService
      .updateItem(this.newItemId, {
        nombre: this.newItemNombre,
        usuario_key: this.newItemKey,
        email: this.newItemEmail,
        telefono: this.newItemTelefono,
        fecha_ingreso: this.newItemFechaIngreso,
      })
      .subscribe(() => {
        this.newItemId = '';
        this.newItemNombre = '';
        this.newItemKey = '';
        this.newItemEmail = '';
        this.newItemTelefono = '';
        this.newItemFechaIngreso = '';
      });
  }

  resetForm(): void {
    this.newItemId = '';
    this.newItemNombre = '';
    this.newItemKey = '';
    this.newItemEmail = '';
    this.newItemTelefono = '';
    this.newItemFechaIngreso = '';
  }

  volver() {
    this.router.navigate(['']);
  }
}
