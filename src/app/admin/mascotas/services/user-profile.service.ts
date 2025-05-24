import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../../usuarios/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private end_point: string = 'user_profile';

  constructor(private httpService: HttpService) { }

  getUser(id: number): Observable<any> {
    let params = `${id}`;
    return this.httpService.get(this.end_point + '/' + params);
  }

  guardar(usuario: UsuarioModel): Observable<any> {
      return this.httpService.post(this.end_point, usuario);
    }

}
