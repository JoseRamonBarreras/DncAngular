import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioEmpleadoModel } from '../models/usuario-empleado.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioEmpleadoService {
  private end_point: string = 'usuarios';
  
    constructor(private httpService: HttpService) { }
  
    usuarios(id: number): Observable<any> {
      return this.httpService.get(`${this.end_point}/${id}`);
    }
  
    guardar(clienteId: number, usuario: UsuarioEmpleadoModel): Observable<any> {
      let object = { ClienteId: clienteId, Usuario: usuario }
      return this.httpService.post(this.end_point + '/usuario', object);
    }
  
    update(clienteId: number, usuario: UsuarioEmpleadoModel): Observable<any> {
      let object = { ClienteId: clienteId, Usuario: usuario }
      return this.httpService.put(`${this.end_point}/usuario/${usuario.id}`, object);
    }
  
    eliminar(id: number): Observable<any> {
      return this.httpService.delete(`${this.end_point}/usuario/${id}`);
    }
}

export class SharedUsuarioEmpleadoService {
  public shared: UsuarioEmpleadoModel = {
    id: 0,
    nombre: '',
    correo: '',
    puesto: 0,
    password: '',
  };

  private messageSource = new BehaviorSubject<UsuarioEmpleadoModel>(this.shared);
  public current = this.messageSource.asObservable();

  constructor() {
    this.shared = new UsuarioEmpleadoModel();
  }

  public set(model: UsuarioEmpleadoModel) {
    this.messageSource.next(model);
  }
}
