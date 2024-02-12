import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as FileSaver from 'file-saver';
import * as XLSX from  'xlsx';

const EXCEL_TYPE = 'aplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private apiUrl = environment.apiUrl; // URL base de la API

  constructor(private http: HttpClient) {}

  // Métodos para realizar solicitudes HTTP a la API

  // Obtener todos los elementos
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Obtener un elemento por ID
  getItemById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo elemento
  createItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, item);
  }

  // Actualizar un elemento existente
  updateItem(id: any, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item);
  }

  // Eliminar un elemento por ID
  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Exportar  a Excel
  exportToExcel(json:any[], excelFileName: string): void {
    const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const  workbook : XLSX.WorkBook = {
      Sheets: {'data': worksheet},
      SheetNames:  ['data'],
    };
    const excelBuffer: any  = XLSX.write(workbook,{ bookType: 'xlsx', type: 'array'});
    this.saveAsExcel(excelBuffer, excelFileName)
  }
  private saveAsExcel(buffer: any , fileName: string): void{
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_exported_' + new Date().getTime() + EXCEL_EXT);
  }
}
