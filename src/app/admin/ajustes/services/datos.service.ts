import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatosClienteModel } from '../models/datos-cliente.model';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private end_point: string = 'datos';

  constructor(private httpService: HttpService) { }

  datos(id: number): Observable<any> {
    return this.httpService.get(`${this.end_point}/${id}`);
  }

  guardarDireccion(datosCliente: DatosClienteModel): Observable<any> {
    // let object = {ClienteId: clienteId, Nombre: nombre}
    return this.httpService.post(this.end_point + '/direccion', datosCliente);
  }

  guardarWhatsapp(datosCliente: DatosClienteModel): Observable<any> {
    return this.httpService.post(this.end_point + '/whatsapp', datosCliente);
  }

}

export class SharedDatosService {
  public shared: DatosClienteModel = {
    id: 0,
    direccion: '',
    ubicacion_lat: 0,
    ubicacion_lng: 0,
    whatsapp: ''
  };

  private messageSource = new BehaviorSubject<DatosClienteModel>(this.shared);
  public current = this.messageSource.asObservable();

  constructor() {
    this.shared = new DatosClienteModel();
  }

  public set(model: DatosClienteModel) {
    this.messageSource.next(model);
  }
}

