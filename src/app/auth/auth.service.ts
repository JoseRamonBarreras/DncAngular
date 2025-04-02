import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private end_point: string = 'login';

  constructor( private httpService: HttpService ) { }

  login(form: any): Observable<any> {
    return this.httpService.post(this.end_point, form.value);
  }

  logout(user_id: any):Observable<any>{
    return this.httpService.post('logout',{'user_id':user_id});
  }
}
