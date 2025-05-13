import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MascotaModel } from './mascota.model';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private end_point: string = 'mascotas';

  constructor(private httpService: HttpService) { }

  mascotas(): Observable<any> {
    return this.httpService.get(this.end_point);
  }

  especies(): Observable<any> {
    return this.httpService.get(this.end_point + '/especies');
  }

  guardar(mascota: MascotaModel): Observable<any> {
    return this.httpService.post(this.end_point, mascota);
  }

  update(mascota: MascotaModel): Observable<any> {
    return this.httpService.put(`${this.end_point}/${mascota.id}`, mascota);
  }

  delete(id: number): Observable<any> {
    return this.httpService.delete(`${this.end_point}/${id}`);
  }

  descargarQr(id: number): Observable<Blob> {
    const url = `mascotas/descargar/qr/${id}`;
    return this.httpService.getImage(url, { responseType: 'blob' });
  }
  

}

export class SharedMascotaService {
  public shared: MascotaModel = {
    id: 0,
    name: '',
    descripcion: '',
    birthday: '',
    phone: '',
    user_id: 0,
    especie_id: 0
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

