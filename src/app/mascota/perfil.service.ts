import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
    private end_point: string = 'mascotas';
  
    constructor(private httpService: HttpService) { }
  
    obtenerPerfil(id: number): Observable<any> {
      return this.httpService.get(`${this.end_point}/${id}`);
    }

    
}
