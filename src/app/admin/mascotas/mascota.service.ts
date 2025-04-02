import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MascotaModel } from './mascota.model';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
   private end_point: string = 'mascotas';
  
    constructor( private httpService: HttpService ) { }
  
    mascotas (): Observable<any> {
      return this.httpService.get( this.end_point );
    }
}

export class SharedMascotaService {
  public shared: MascotaModel = {
    id: 0,
    name: '',
    birthday: '',
    phone: 0,
    user_id: 0
  };

  private messageSource = new BehaviorSubject<MascotaModel>(this.shared);
  public current = this.messageSource.asObservable();

  constructor() {
    this.shared = new MascotaModel();
  }

  public set(model: MascotaModel) {
    this.messageSource.next(model);
  }
}

