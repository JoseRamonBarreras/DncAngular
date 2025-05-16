import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Observable } from 'rxjs';

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

}
