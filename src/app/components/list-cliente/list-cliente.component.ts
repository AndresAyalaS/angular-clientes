import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '../../service/cliente.service';
import { DatePipe } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [FormsModule, DatePipe ],
  templateUrl: './list-cliente.component.html',
  styleUrl: './list-cliente.component.css',
})
export class ListClienteComponent implements OnInit {
  items: any[] = [];
  editItemId: number | null = null;
  newItemNombre = '';
  newItemKey = '';
  editItemNombre = '';
  editItemKey = '';

  terminoBusqueda: string = '';
  itemsFiltrados: any[] = [];

  constructor(private clienteService: ClientesService, private router: Router) {}
  ngOnInit(): void {
    this.loadItems();
  }
  
  loadItems(): void {
    this.clienteService.getItems().subscribe((response) => {
      this.items = response;
      this.itemsFiltrados = this.items
    });
  }

  agregarItem() {
    this.router.navigate(['/agregar']);
  }

  confirmarEliminar(item: any) {
    if (confirm(`¿Estás seguro que quieres eliminar el cliente ${item.nombre}?`)) {
      this.deleteItem(item.id);
    }
  }
  deleteItem(id: number): void {
    this.clienteService.deleteItem(id).subscribe(() => {
      this.loadItems();
    });
  }

  export(): void {
    this.clienteService.exportToExcel(this.items, 'listadoClientes');
  }

  filtro(usuarioKey: string) {
    this.itemsFiltrados = this.items.filter(item => {
      return item.usuario_key.toLowerCase().includes(usuarioKey.toLowerCase());
    })
  }
}
