import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralClienteModel } from '../models/general-cliente.model';

@Injectable({
  providedIn: 'root'
})
export class AjusteService {
   private end_point: string = 'ajustes';
  
    constructor(private httpService: HttpService) { }

    ajustes(id: number): Observable<any> {
      return this.httpService.get(`${this.end_point}/${id}`);
    }

    guardarLogo(clienteId: number, logo: string): Observable<any> {
      let object = {ClienteId: clienteId, Logo: logo}
      return this.httpService.post(this.end_point + '/logo', object);
    }

    guardarPortada(clienteId: number, portada: string): Observable<any> {
      let object = {ClienteId: clienteId, Portada: portada}
      return this.httpService.post(this.end_point + '/portada', object);
    }

    guardarNombre(clienteId: number, nombre: string): Observable<any> {
      let object = {ClienteId: clienteId, Nombre: nombre}
      return this.httpService.post(this.end_point + '/nombre', object);
    }
  
    // mascotas(): Observable<any> {
    //   return this.httpService.get(this.end_point);
    // }
  
    // especies(): Observable<any> {
    //   return this.httpService.get(this.end_point + '/especies');
    // }
  
    // delete(id: number): Observable<any> {
    //   return this.httpService.delete(`${this.end_point}/${id}`);
    // }
  
    descargarQr(id: number): Observable<Blob> {
      const url = `ajustes/descargar/qr/${id}`;
      return this.httpService.getImage(url, { responseType: 'blob' });
    }
}

export class SharedGeneralService {
  public shared: GeneralClienteModel = {
    id: 0,
    nombre: '',
    logo_url: '',
    portada_url: ''
  };

  private messageSource = new BehaviorSubject<GeneralClienteModel>(this.shared);
  public current = this.messageSource.asObservable();

  constructor() {
    this.shared = new GeneralClienteModel();
  }

  public set(model: GeneralClienteModel) {
    this.messageSource.next(model);
  }
}
