import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeccionNameService {
  public name: string = 'Seccion Titulo';
  private messageSource = new BehaviorSubject<string>(this.name);
  public current = this.messageSource.asObservable();
  constructor() {this.name = '';}
  public set(name: string) {this.messageSource.next(name);}
}
