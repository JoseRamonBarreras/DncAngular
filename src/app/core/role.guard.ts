import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        interface Permiso {
            name: string;
        }

        const storage = localStorage.getItem('permisos');
        const permisos: Array<string> = storage ? (JSON.parse(storage) as Permiso[]).map(p => p.name) : [];

        const acceso = route.data['acceso'] as string;
        return (permisos.some(permiso => permiso == acceso ? true : false));
    }

}
