import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { PuestoModel } from '../models/puesto.model';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {
  private end_point: string = 'puestos';

  constructor(private httpService: HttpService) { }

  puestos(id: number): Observable<any> {
    return this.httpService.get(`${this.end_point}/${id}`);
  }

  guardar(clienteId: number, puesto: PuestoModel): Observable<any> {
    let object = { ClienteId: clienteId, Puesto: puesto }
    return this.httpService.post(this.end_point + '/puesto', object);
  }

  update(clienteId: number, puesto: PuestoModel): Observable<any> {
    let object = { ClienteId: clienteId, Puesto: puesto }
    return this.httpService.put(`${this.end_point}/puesto/${puesto.id}`, object);
  }

  eliminarPuesto(id: number): Observable<any> {
    return this.httpService.delete(`${this.end_point}/puesto/${id}`);
  }
}

export class SharedPuestoService {
  public shared: PuestoModel = {
    id: 0,
    nombre: '',
    descripcion: ''
  };

  private messageSource = new BehaviorSubject<PuestoModel>(this.shared);
  public current = this.messageSource.asObservable();

  constructor() {
    this.shared = new PuestoModel();
  }

  public set(model: PuestoModel) {
    this.messageSource.next(model);
  }
}
