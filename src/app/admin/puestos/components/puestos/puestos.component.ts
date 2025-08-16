import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PuestoModel } from '../../models/puesto.model';
import { Table } from 'primeng/table';
import { PuestoService, SharedPuestoService } from '../../services/puesto.service';
import { StatePuestoService } from '../../services/state-puesto.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrl: './puestos.component.css'
})
export class PuestosComponent {
  puestos: any[] = [];
  listener!: Subscription;
  displayCrear: boolean = false;
  puesto!: PuestoModel;
  @ViewChild('dt2') dt2!: Table;

  constructor(
    private puestoService: PuestoService,
    private stateService: StatePuestoService,
    private sharedPuesto: SharedPuestoService,
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
          key: 'puestos',
          severity: 'info',
          summary: 'Guardado',
          detail: 'El puesto se guardo correctamente'
        });
      }

    });
  }

  private getList() {
    this.puestoService.puestos(Number(localStorage.getItem('cliente_id'))).subscribe(resp => {
      this.puestos = resp.puestos;
      console.log('Puestos', this.puestos);
    }, error => error);
  }

  crear() {
    this.sharedPuesto.set(new PuestoModel());
    this.displayCrear = true;
  }

  editar(puesto: PuestoModel) {
    const copia = { ...puesto };
    this.sharedPuesto.set(copia as PuestoModel);
    this.displayCrear = true;
  }

  eliminar(puesto: any) {
    Swal.fire({
      title: 'Eliminar puesto: ' + puesto.nombre,
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
        this.puestoService.eliminarPuesto(puesto.id).subscribe(resp => {
          console.log('Delete FromBackend', resp);
          this.getList();
        }, error => error);
      }
    });
  }

}
