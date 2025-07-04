import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedUsuarioService, UsuarioService } from '../../usuario.service';
import { Subscription } from 'rxjs';
import { UsuarioModel } from '../../usuario.model';
import { SeccionNameService } from '../../../shared/services/seccion-name.service';
import { StateService } from '../../../shared/services/state.service';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent implements OnInit {
  users: any[] = [];
  listener!: Subscription;
  displayCrear: boolean = false;
  displayEditar: boolean = false;
  displayCambiarPassword: boolean = false;
  user!: UsuarioModel;
  @ViewChild('dt2') dt2!: Table;

  constructor(
    private usuarioService: UsuarioService,
    private seccionName: SeccionNameService,
    private stateService: StateService,
    private sharedUsuario: SharedUsuarioService
  ) {

  }

  ngOnInit(): void {
    this.seccionName.set('MANTENIMIENTO / Usuarios');
    this.getUsuariosList();
    this.listeners();
  }

  onFilter(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt2.filterGlobal(inputValue, 'contains');  // Accedemos a la tabla a través de ViewChild
  }

  private listeners() {
    this.listener = this.stateService.currentAccion.subscribe((accion: any) => {
      console.log(accion);
      this.displayCrear = accion.displayCrear;
      this.displayEditar = accion.displayEditar;
      this.displayCambiarPassword = accion.displayCambiarPassword;
      if (accion.guardado) {
        this.getUsuariosList();
      }
    });
  }

  private getUsuariosList() {
    this.usuarioService.getUsers().subscribe(resp => {
      this.users = resp;
      console.log('Users', this.users);
    }, error => error);
  }

  crear() {
    this.displayCrear = true;
  }

  editar(user: any) {
    this.usuarioService.getUser(user.id).subscribe(resp => {
      this.user = new UsuarioModel();
      this.user = resp;
      this.displayEditar = true;
      this.sharedUsuario.set(this.user);
    });
  }

  cambiarPassword(user: any) {
    this.user = new UsuarioModel();
    this.user = user;
    this.user.nombre = user.name;
    this.displayCambiarPassword = true;
    this.sharedUsuario.set(this.user);
  }

  eliminar(usuario: any) {
    Swal.fire({
      title: 'Eliminar usuario: ' + usuario.name,
      text: "Desea continuar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUser(usuario.id).subscribe(resp => {
          this.getUsuariosList();
        }, error => error);
      }
    });
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'danger' | 'info' {
    switch (status.toLowerCase()) {
      case 'activo':
        return 'success';
      case 'pendiente':
        return 'warning';
      case 'suspendido':
        return 'danger';
      default:
        return 'info';
    }
  }

  getPlanSeverity(plan: string): 'info' | 'success' | 'warning' | 'danger' {
    switch (plan.toLowerCase()) {
      case 'gratis':
        return 'info';
      case 'basico':
        return 'success';
      case 'pro':
        return 'warning';
      default:
        return 'danger'; // para cualquier otro plan no reconocido
    }
  }


}
