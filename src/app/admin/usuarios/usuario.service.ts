import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioModel } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private end_point: string = 'dashboard';

  constructor( private httpService: HttpService ) { }

  getLogs (): Observable<any> {
    return this.httpService.get( this.end_point + '/logs' );
  }

  getRoles (): Observable<any> {
    return this.httpService.get( this.end_point + '/roles' );
  }

  getEmpresas (): Observable<any> {
    return this.httpService.get( this.end_point + '/empresas' );
  }

  saveRol( rol: string ): Observable<any> {
    let params = `?rol=${rol}`;
    return this.httpService.post( this.end_point + '/roles/guardar' + params );
  }

  updateRol( id: number, rol: string ): Observable<any> {
    let params = `?id=${id}&rol=${rol}`;
    return this.httpService.put( this.end_point + '/roles/actualizar/' + params);
  }

  getUsers (): Observable<any> {
    return this.httpService.get( this.end_point + '/usuarios' );
  }

  getUser ( id: number ): Observable<any> {
    let params = `${id}`;
    return this.httpService.get( this.end_point + '/usuario/' + params );
  }

  saveUser( usuario: UsuarioModel): Observable<any> {
    return this.httpService.post( this.end_point + '/usuario/guardar', usuario );
  }

  updateUser( usuario: UsuarioModel): Observable<any> {
    let params = `${usuario.id}`;
    return this.httpService.put( this.end_point + '/usuario/actualizar/' + params, usuario );
  }

  deleteUser( id: number ): Observable<any> {
    let params = `?id=${id}`;
    return this.httpService.delete( this.end_point + '/usuario/eliminar' + params);
  }

  resetPassword( id: number, password: string ): Observable<any> {
    let params = `?id=${id}&new_password=${password}`;
    return this.httpService.put( this.end_point + '/usuario/reset_password' + params);
  }

  getProfileFromRecursosHumanos(empresa: number, empleado: number): Observable<any> {
    let params = `?empresa=${empresa}&empleado=${empleado}`;
    return this.httpService.get( this.end_point + '/usuario/profile/rh' + params);
  }
}

export class SharedUsuarioService {
  public shared: UsuarioModel = {
    id: 0,
    nombre: '',
    correo: '',
    password: '',
    rol: '',
    favorite_pet: ''
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


