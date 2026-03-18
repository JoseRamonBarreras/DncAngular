import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { EncuestaModel } from '../models/encuesta.model';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private end_point: string = 'encuestas';
  
    constructor(private httpService: HttpService) { }
  
    encuestas(id: number): Observable<any> {
      return this.httpService.get(`${this.end_point}/${id}`);
    }
  
    guardar(clienteId: number, userId: number, encuesta: EncuestaModel): Observable<any> {
      let object = { ClienteId: clienteId, UserId: userId, Encuesta: encuesta }
      return this.httpService.post(this.end_point + '/encuesta', object);
    }
  
    update(clienteId: number, userId: number, encuesta: EncuestaModel): Observable<any> {
      let object = { ClienteId: clienteId, UserId: userId, Encuesta: encuesta }
      return this.httpService.put(`${this.end_point}/encuesta/${encuesta.id}`, object);
    }
  
    eliminar(id: number): Observable<any> {
      return this.httpService.delete(`${this.end_point}/encuesta/${id}`);
    }
}

export class SharedEncuestaService {
  public shared: EncuestaModel = {
    id: 0,
    titulo: '',
    descripcion: '',
    puesto: 0
  };

  private messageSource = new BehaviorSubject<EncuestaModel>(this.shared);
  public current = this.messageSource.asObservable();

  constructor() {
    this.shared = new EncuestaModel();
  }

  public set(model: EncuestaModel) {
    this.messageSource.next(model);
  }
}
