import { Component,
  OnInit,
  AfterViewInit,
  NgZone,
  ElementRef,
  ViewChild, } from '@angular/core';
import { DatosClienteModel } from '../../models/datos-cliente.model';
import { Subscription } from 'rxjs';
import { DatosService, SharedDatosService } from '../../services/datos.service';
import { MessageService } from 'primeng/api';
import { StateDatosService } from '../../services/state-datos.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent {
  datosCliente!: DatosClienteModel;
  listener!: Subscription;
  isLoading = true;

  displayDireccion: boolean = false;
  displayWhatsapp: boolean = false;
  displayHorario: boolean = false;
  displayEnvio: boolean = false;

  private map!: google.maps.Map;
  private marker!: google.maps.Marker;

  constructor(
      private stateDatos: StateDatosService,
      private datosService: DatosService,
      private messageService: MessageService,
      private sharedDatos: SharedDatosService,
      private ngZone: NgZone
    ) {
  
    }

  ngOnInit(): void {
    this.getDatosCliente();
    this.listeners();
  }

 

  private listeners() {
    this.listener = this.stateDatos.currentAccion.subscribe((accion: any) => {
      console.log('Accion', accion);
      this.displayDireccion = accion.displayDireccion;
      this.displayWhatsapp = accion.displayWhatsapp;
      this.displayHorario = accion.displayHorario;
      this.displayEnvio = accion.displayEnvio;
      if (accion.guardado == true) {
        this.getDatosCliente();
        this.messageService.add({
          key: 'ajustes',
          severity: 'success',
          summary: 'Guardado',
          detail: 'Ajustes guardados'
        });
      }
    });
  }

  private getDatosCliente() {
    this.datosService.datos(Number(localStorage.getItem('cliente_id'))).subscribe(resp => {
      this.datosCliente = resp;
      console.log('DatosClienteModel', this.datosCliente);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  onDireccionClick() {
    this.sharedDatos.set(this.datosCliente);
    this.displayDireccion = true;
  }

  onWhatsappClick() {
    this.sharedDatos.set(this.datosCliente);
    this.displayWhatsapp = true;
  }

  onHorarioClick() {
    this.sharedDatos.set(this.datosCliente);
    this.displayHorario = true;
  }

  onOpcionesEnvioClick() {
    this.displayEnvio = true;
  }

  onRangosEnvioClick() {
    // Configurar rangos
  }


}
