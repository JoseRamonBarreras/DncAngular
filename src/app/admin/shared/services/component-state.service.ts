import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentStateService {
  accion: Object = {};

  private accionSource = new BehaviorSubject<Object>(this.accion);
  public currentAccion = this.accionSource.asObservable();

  constructor() { }


  public hideCrop() {
    this.accion = { displayCrop: false }
    this.accionSource.next(this.accion);
  }
}
