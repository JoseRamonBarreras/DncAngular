import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MascotaModel } from '../../mascota.model';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import { MascotaService, SharedMascotaService } from '../../mascota.service';
import { StateService } from '../../../shared/services/state.service';

@Component({
  selector: 'app-listar-mascotas',
  templateUrl: './listar-mascotas.component.html',
  styleUrl: './listar-mascotas.component.css'
})
export class ListarMascotasComponent {
  mascotas: any[] = [];
  listener!: Subscription;
  displayCrear: boolean = false;
  displayEditar: boolean = false;
  mascota!: MascotaModel;
  @ViewChild('dt2') dt2!: Table;

  constructor(
    private mascotaService: MascotaService,
    private stateService: StateService,
    private sharedMascota: SharedMascotaService
  ) {

  }

  ngOnInit(): void {
    this.getMascotasList();
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
      if (accion.guardado) {
        this.getMascotasList();
      }
    });
  }

  private getMascotasList() {
    this.mascotaService.mascotas().subscribe(resp => {
      this.mascotas = resp;
      console.log('Mascotas', this.mascotas);
    }, error => error);
  }

  crear() {
    this.displayCrear = true;
  }

  editar(mascota: any) {
    // this.usuarioService.getUser(user.id).subscribe(resp => {
    //   this.user = new UsuarioModel();
    //   this.user = resp;
    //   this.displayEditar = true;
    //   this.sharedUsuario.set(this.user);
    // });
  }

  eliminar(usuario: any) {
    // Swal.fire({
    //   title: 'Eliminar usuario: ' + usuario.name,
    //   text: "Desea continuar?",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#ef4444',
    //   cancelButtonColor: '#64748b',
    //   confirmButtonText: 'Eliminar',
    //   cancelButtonText: 'Cancelar',
    //   allowOutsideClick: false
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.usuarioService.deleteUser(usuario.id).subscribe(resp => {
    //       this.getUsuariosList();
    //     }, error => error);
    //   }
    // });
  }
}
