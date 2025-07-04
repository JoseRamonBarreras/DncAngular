import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioModel } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private end_point: string = 'users';

  constructor( private httpService: HttpService ) { }

  getLogs (): Observable<any> {
    return this.httpService.get( this.end_point + '/logs' );
  }

  getRoles (): Observable<any> {
    return this.httpService.get( this.end_point + '/roles' );
  }

  getUsers (): Observable<any> {
    return this.httpService.get( this.end_point + '/usuarios' );
  }

  getUser ( id: number ): Observable<any> {
    let params = `${id}`;
    return this.httpService.get( this.end_point + '/usuario/' + params );
  }

  saveUser( usuario: UsuarioModel): Observable<any> {
    return this.httpService.post( this.end_point + '/usuario/store', usuario );
  }

  updateUser( usuario: UsuarioModel): Observable<any> {
    let params = `${usuario.id}`;
    return this.httpService.put( this.end_point + '/usuario/update/' + params, usuario );
  }

  deleteUser( id: number ): Observable<any> {
    let params = `?id=${id}`;
    return this.httpService.delete( this.end_point + '/usuario/delete' + params);
  }

  resetPassword( id: number, password: string ): Observable<any> {
    let params = `?id=${id}&new_password=${password}`;
    return this.httpService.put( this.end_point + '/usuario/reset_password' + params);
  }

}

export class SharedUsuarioService {
  public shared: UsuarioModel = {
    id: 0,
    nombre: '',
    correo: '',
    password: '',
  };

  private messageSource = new BehaviorSubject<UsuarioModel>(this.shared);
  public current = this.messageSource.asObservable();

  constructor() {
    this.shared = new UsuarioModel();
  }

  public set(model: UsuarioModel) {
    this.messageSource.next(model);
  }
}


