import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioEmpleadoModel } from '../../models/usuario-empleado.model';
import { Table } from 'primeng/table';
import { PuestoService } from '../../services/puesto.service';
import { StateUsuarioEmpleadoService } from '../../services/state-usuario-empleado.service';
import { SharedUsuarioEmpleadoService, UsuarioEmpleadoService } from '../../services/usuario-empleado.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  puestos: any[] = [];
  usuarios: any[] = [];
  listener!: Subscription;
  displayCrear: boolean = false;
  usuario!: UsuarioEmpleadoModel;
  @ViewChild('dt2') dt2!: Table;

  constructor(
    private puestoService: PuestoService,
    private usuarioService: UsuarioEmpleadoService,
    private stateService: StateUsuarioEmpleadoService,
    private sharedUsuario: SharedUsuarioEmpleadoService,
    private messageService: MessageService,
  ) {

  }

  ngOnInit(): void {
    this.getPuestos();
    this.getList();
    this.listeners();
  }

  onFilter(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt2.filterGlobal(inputValue, 'contains');
  }

  private listeners() {
    this.listener = this.stateService.currentAccion.subscribe((accion: any) => {
      console.log('Accion', accion);
      this.displayCrear = accion.displayCrear;
      if (accion.guardado == true) {
        this.getList();
        this.messageService.add({
          key: 'usuarios',
          severity: 'info',
          summary: 'Guardado',
          detail: 'El usuario se guardo correctamente'
        });
      }

    });
  }

  private getPuestos() {
    this.puestoService.puestos(Number(localStorage.getItem('cliente_id'))).subscribe(resp => {
      this.puestos = resp.puestos;
      console.log('Puestos', this.puestos);
    }, error => error);
  }

  private getList() {
    this.usuarioService.usuarios(Number(localStorage.getItem('cliente_id'))).subscribe(resp => {
      this.usuarios = resp.usuarios;
      console.log('Usuarios', this.usuarios);
    }, error => error);
  }

  crear() {
    this.sharedUsuario.set(new UsuarioEmpleadoModel());
    this.displayCrear = true;
  }

  editar(usuario: any) {
    let userModel = new UsuarioEmpleadoModel();
    userModel.id = usuario.id;
    userModel.nombre = usuario.name;
    userModel.correo = usuario.email;
    userModel.puesto = usuario.puesto_id;
    this.sharedUsuario.set(userModel);
    this.displayCrear = true;
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
        this.usuarioService.eliminar(usuario.id).subscribe(resp => {
          console.log('Delete FromBackend', resp);
          this.getList();
        }, error => error);
      }
    });
  }

}
