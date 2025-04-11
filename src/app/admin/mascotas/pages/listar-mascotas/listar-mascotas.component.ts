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
  mascota!: MascotaModel;
  @ViewChild('dt2') dt2!: Table;
  fotoDemo!: string;
  baseUrl = 'http://127.0.0.1:8000/storage/mascotas/';

  constructor(
    private mascotaService: MascotaService,
    private stateService: StateService,
    private sharedMascota: SharedMascotaService
  ) {

  }

  ngOnInit(): void {
    this.fotoDemo = "./img/icons/petdemo.png";
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
    this.sharedMascota.set(new MascotaModel()); 
    this.displayCrear = true;
  }

  editar(mascota: MascotaModel) {
    this.sharedMascota.set(mascota);  
    this.displayCrear = true;
  }

  eliminar(mascota: any) {
    Swal.fire({
      title: 'Eliminar mascota: ' + mascota.name,
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
        this.mascotaService.delete(mascota.id).subscribe(resp => {
          console.log('Delete FromBackend', resp);
          this.getMascotasList();
        }, error => error);
      }
    });
  }
}
