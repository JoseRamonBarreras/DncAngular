import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateDatosService {
  accion: Object = {};

  private accionSource = new BehaviorSubject<Object>(this.accion);
  public currentAccion = this.accionSource.asObservable();

  constructor() { }

  public cancelarDireccion() {
    this.accion = { displayDireccion: false }
    this.accionSource.next(this.accion);
  }

  public savedDireccion() {
    this.accion = { displayDireccion: false, guardado: true }
    this.accionSource.next(this.accion);
  }

  public cancelarWhatsapp() {
    this.accion = { displayWhatsapp: false }
    this.accionSource.next(this.accion);
  }

  public savedWhatsapp() {
    this.accion = { displayWhatsapp: false, guardado: true }
    this.accionSource.next(this.accion);
  }

  public cancelarHorario() {
    this.accion = { displayHorario: false }
    this.accionSource.next(this.accion);
  }

  public savedHorario() {
    this.accion = { displayHorario: false, guardado: true }
    this.accionSource.next(this.accion);
  }

  public cancelarEnvio() {
    this.accion = { displayEnvio: false }
    this.accionSource.next(this.accion);
  }

  public savedEnvio() {
    this.accion = { displayEnvio: false, guardado: true }
    this.accionSource.next(this.accion);
  }

}
