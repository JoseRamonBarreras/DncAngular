import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private end_point: string = 'horarios';

  constructor(private httpService: HttpService) { }

  horarios(id: number): Observable<any> {
    return this.httpService.get(`${this.end_point}/${id}`);
  }

  // guardarDireccion(datosCliente: DatosClienteModel): Observable<any> {
  //   // let object = {ClienteId: clienteId, Nombre: nombre}
  //   return this.httpService.post(this.end_point + '/direccion', datosCliente);
  // }
}
