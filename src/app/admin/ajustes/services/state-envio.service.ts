import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateEnvioService {
accion: Object = {};

  private accionSource = new BehaviorSubject<Object>(this.accion);
  public currentAccion = this.accionSource.asObservable();

  constructor() { }

  public cancelarRangos() {
    this.accion = { displayRangos: false }
    this.accionSource.next(this.accion);
  }

  public savedRangos() {
    this.accion = { displayRangos: false, guardado: true }
    this.accionSource.next(this.accion);
  }
}
