import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {
    private end_point: string = 'envios';
  
    constructor(private httpService: HttpService) { }
  
    envios(id: number): Observable<any> {
      return this.httpService.get(`${this.end_point}/${id}`);
    }

    guardarEnvio(clienteId: number, envio: any): Observable<any> {
      let object = {ClienteId: clienteId, envio: envio}
      return this.httpService.post(this.end_point + '/envio', object);
    }

    guardarRangos(envioId: number, rangos: any): Observable<any> {
      let object = {EnvioId: envioId, rangos: rangos}
      return this.httpService.post(this.end_point + '/rangos', object);
    }
}
