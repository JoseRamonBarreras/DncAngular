import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncuestaModel } from '../../models/encuesta.model';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { PuestoService } from '../../../puestos/services/puesto.service';
import { EncuestaService, SharedEncuestaService } from '../../services/encuesta.service';
import { StateService } from '../../../shared/services/state.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrl: './encuestas.component.css'
})
export class EncuestasComponent {
  encuestas: any[] = [];
    listener!: Subscription;
    displayCrear: boolean = false;
    encuesta!: EncuestaModel;
    @ViewChild('dt2') dt2!: Table;
  
    constructor(
      private encuestaService: EncuestaService,
      private stateService: StateService,
      private sharedEncuesta: SharedEncuestaService,
      private messageService: MessageService,
    ) {
  
    }
  
    ngOnInit(): void {
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
            key: 'encuestas',
            severity: 'success',
            summary: 'Guardado',
            detail: 'La encuesta se guardo correctamente'
          });
        }
  
      });
    }
  
    private getList() {
      this.encuestaService.encuestas(Number(localStorage.getItem('cliente_id'))).subscribe(resp => {
        this.encuestas = resp.encuestas;
        console.log('Encuestas', this.encuestas);
      }, error => error);
    }

    ver(encuesta: EncuestaModel){

    }
  
    crear() {
      this.sharedEncuesta.set(new EncuestaModel());
      this.displayCrear = true;
    }
  
    editar(encuesta: any) {
       let encuestaModel = new EncuestaModel();
          encuestaModel.id = encuesta.id;
          encuestaModel.titulo = encuesta.titulo;
          encuestaModel.descripcion = encuesta.descripcion;
          encuestaModel.puesto = encuesta.puesto_id;
      this.sharedEncuesta.set(encuestaModel);
      this.displayCrear = true;
    }
  
    eliminar(encuesta: EncuestaModel) {
      Swal.fire({
        title: 'Eliminar encuesta: ' + encuesta.titulo,
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
          this.encuestaService.eliminar(encuesta.id).subscribe(resp => {
            console.log('Delete FromBackend', resp);
            this.getList();
          }, error => error);
        }
      });
    }
}
