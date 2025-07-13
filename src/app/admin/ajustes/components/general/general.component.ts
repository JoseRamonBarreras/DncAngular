import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { GeneralClienteModel } from '../../models/general-cliente.model';
import { AjusteService, SharedGeneralService } from '../../services/ajuste.service';
import { Subscription } from 'rxjs';
import { StateService } from '../../../shared/services/state.service';
import { StateGeneralService } from '../../services/state-general.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent {
  logoPlaceholder: string = environment.logoPlaceholder;
  portadaPlaceholder: string = environment.portadaPlaceholder;
  logoUrl: string | null = null;
  portadaUrl: string | null = null;
  generalCliente!: GeneralClienteModel;
  baseQr = environment.baseQr;
  isLoading = true;
  baseUrl = environment.baseUrl;
  negocioImageUrl = environment.negocioImageUrl;
  listener!: Subscription;

  displayLogo: boolean = false;
  displayPortada: boolean = false;
  displayNombre: boolean = false;


  constructor(
    private stateGeneral: StateGeneralService,
    private ajusteService: AjusteService,
    private messageService: MessageService,
    private sharedGeneral: SharedGeneralService
  ) {

  }

  ngOnInit(): void {
    this.getGeneralCliente();
    this.listeners();
  }

  private listeners() {
    this.listener = this.stateGeneral.currentAccion.subscribe((accion: any) => {
      console.log('Accion', accion);
      this.displayLogo = accion.displayLogo;
      this.displayPortada = accion.displayPortada;
      this.displayNombre = accion.displayNombre;
      if (accion.guardado == true) {
        this.getGeneralCliente();
        this.messageService.add({
          key: 'ajustes',
          severity: 'success',
          summary: 'Guardado',
          detail: 'Ajustes guardados'
        });
      }
    });
  }

  private getGeneralCliente() {
    this.ajusteService.ajustes(Number(localStorage.getItem('cliente_id'))).subscribe(resp => {
      this.generalCliente = resp;
      console.log('GeneralClienteModel', this.generalCliente);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  subirLogo() {
    this.displayLogo = true;
  }

  parentFunctionLogo(base64: string) {
    console.log('Imagen recortada (base64):', base64);
    // this.imagenPreview = base64;
    //this.mascota.foto = base64;
    // this.fotoEditada = true;
  }

  subirPortada() {
    this.displayPortada = true;
  }

  editarNombre() {
    this.sharedGeneral.set(this.generalCliente);
    this.displayNombre = true;
  }

  descargarQr(id: number): void {
    // this.mascotaService.descargarQr(id).subscribe({
    //   next: (blob: Blob) => {
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = `qr_mascota_${id}.png`;
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //   },
    //   error: (err) => {
    //     console.error('Error al descargar QR:', err);
    //   }
    // });
  }

}
