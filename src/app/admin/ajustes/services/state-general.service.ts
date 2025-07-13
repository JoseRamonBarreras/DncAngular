import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateGeneralService {
  accion: Object = {};
  
    private accionSource = new BehaviorSubject<Object>(this.accion);
    public currentAccion = this.accionSource.asObservable();
  
    constructor() { }
  
    public cancelarLogo() {
      this.accion = { displayLogo: false }
      this.accionSource.next(this.accion);
    }
  
    public savedLogo() {
      this.accion = { displayLogo: false, guardado: true }
      this.accionSource.next(this.accion);
    }

    public cancelarPortada() {
      this.accion = { displayPortada: false }
      this.accionSource.next(this.accion);
    }
  
    public savedPortada() {
      this.accion = { displayPortada: false, guardado: true }
      this.accionSource.next(this.accion);
    }

    public cancelarNombre() {
      this.accion = { displayNombre: false }
      this.accionSource.next(this.accion);
    }
  
    public savedNombre() {
      this.accion = { displayNombre: false, guardado: true }
      this.accionSource.next(this.accion);
    }
  
   
}
