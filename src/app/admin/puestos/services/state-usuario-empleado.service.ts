import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateUsuarioEmpleadoService {
  accion: Object = {};

  private accionSource = new BehaviorSubject<Object>(this.accion);
  public currentAccion = this.accionSource.asObservable();

  constructor() { }

  public cancelar() {
    this.accion = { displayCrear: false }
    this.accionSource.next(this.accion);
  }

  public saved() {
    this.accion = { displayCrear: false, guardado: true }
    this.accionSource.next(this.accion);
  }
}
