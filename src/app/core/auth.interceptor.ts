import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/app.reducers';
import { State } from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<AuthState>) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        let headers = null;
        const rol = localStorage.getItem('roles');
        const user_id = localStorage.getItem('user_id');

        return this.store.select('authState').pipe(
            take(1),
            switchMap((authState: State) => {
                if (!authState.authToken) {
                    console.log(" Token NULL");
                    return next.handle(request);
                }

                headers = new HttpHeaders({
                    'Authorization': `Bearer ${authState.authToken}`
                });

                if (rol) { headers = headers.set('role', rol); }

                if (user_id) { headers = headers.set('user_id', user_id); }

                const requestChange = request.clone({ headers });
                console.log(requestChange);
                return next.handle(requestChange);
            })
        );
    }
}
