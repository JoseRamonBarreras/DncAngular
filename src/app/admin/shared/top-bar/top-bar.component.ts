import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/app.reducers';
import { AuthService } from '../../../auth/auth.service';
import * as AuthActions from '../../../auth/store/auth.actions';
import { MenuItem } from 'primeng/api';
import { SeccionNameService } from '../services/seccion-name.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnInit {
  tituloSeccion: string = '';
  usuario = localStorage.getItem('user_name');
  rol = localStorage.getItem('roles');
  logo!: string;
  sidebarVisible: boolean = false;
  items!: MenuItem[];
  menuItems!: MenuItem[];

  userMenu = [
    { label: 'Perfil', icon: 'pi pi-user', command: () => this.verPerfil() },
    { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  constructor(
    private router: Router,
    private store: Store<AuthState>,
    private authService: AuthService,
    private seccionName: SeccionNameService
  ) {

  }

  ngOnInit(): void {
    this.logo = "./img/logo_PetQR.png";
    this.menuItems = this.getMenu();
    this.seccionName.current.subscribe(titulo => {
      console.log('Li', titulo);
      this.tituloSeccion = titulo;
    });
  }

  

  verPerfil() {
    console.log('Ver perfil');
  }

  private getMenu() {
    const menu = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: 'dashboard',
        command: () => this.sidebarVisible = false
      },
      {
        label: 'Mascotas QR',
        icon: 'pi pi-qrcode',
        routerLink: 'mascotas',
        command: () => this.sidebarVisible = false
      },
      // {
      //   label: 'Mantenimiento',
      //   icon: 'pi pi-cog',
      //   items: [
      //     {
      //       label: 'Insumos',
      //       icon: 'pi pi-align-left',
      //       routerLink: 'insumos',
      //       command: () => this.sidebarVisible = false
      //     }
      //   ]
      // },
      // {
      //   label: 'Movimientos Almacen',
      //   icon: 'pi pi-warehouse',
      //   routerLink: 'movimientos',
      //   command: () => this.sidebarVisible = false
      // },
    ];

    if (this.rol === 'SISTEMAS' || this.rol === 'ADMINISTRADOR') {
      menu.push({
        label: 'Usuarios',
        icon: 'pi pi-users',
        routerLink: 'usuarios',
        command: () => this.sidebarVisible = false
      });
    }

    return menu;
  }

  logout(): void {
    let user_id = localStorage.getItem('user_id');
    this.authService.logout(user_id).subscribe(
      response => {
        localStorage.clear();
        this.store.dispatch(AuthActions.logout());
        this.router.navigate(['/auth']);
      },
      err => { console.log(err); }
    )
  }

}
