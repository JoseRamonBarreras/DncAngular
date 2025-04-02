import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  
  accion: Object = {};

  private accionSource = new BehaviorSubject<Object>(this.accion);
  public currentAccion = this.accionSource.asObservable();

  constructor() { }

  public cancelarAgregar() {
    this.accion = { displayCrear: false }
    this.accionSource.next(this.accion);
  }

  public cancelarEditar() {
    this.accion = { displayEditar: false }
    this.accionSource.next(this.accion);
  }

  public saved() {
    this.accion = { displayCrear: false, guardado: true }
    this.accionSource.next(this.accion);
  }

  public updated() {
    this.accion = { displayEditar: false, guardado: true }
    this.accionSource.next(this.accion);
  }

  public cancelarPassword() {
    this.accion = { displayCambiarPassword: false }
    this.accionSource.next(this.accion);
  }

  public savedMovimiento(idMovimiento: number){
    this.accion = { displayCrear: false, guardado: true, id: idMovimiento }
    this.accionSource.next(this.accion);
  }

  public updateMovimiento(idMovimiento: number){
    this.accion = { displayEditar: false, guardado: true, id: idMovimiento }
    this.accionSource.next(this.accion);
  }

  public cancelarProductoMov() {
    this.accion = { displayCrearProductoMov: false, guardado: true }
    this.accionSource.next(this.accion);
  }
  
}
