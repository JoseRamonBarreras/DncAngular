import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatosClienteModel } from '../../../models/datos-cliente.model';
import { DatosService, SharedDatosService } from '../../../services/datos.service';
import { StateDatosService } from '../../../services/state-datos.service';
import Swal from 'sweetalert2';

type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';


@Component({
  selector: 'app-whats-app',
  templateUrl: './whats-app.component.html',
  styleUrl: './whats-app.component.css'
})
export class WhatsAppComponent {
  visible: boolean = false;
  position: DialogPosition = 'top';
  whatsappForm!: FormGroup;
  datosCliente!: DatosClienteModel;
  loading: boolean = false;

  constructor(
    private sharedDatos: SharedDatosService,
    private stateDatos: StateDatosService,
    private datosService: DatosService,
    private cd: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.showDialog();

    this.sharedDatos.current.subscribe(datos => {
      this.datosCliente = datos;
      setTimeout(() => {
        this.setFormValues();
      }, 1000);
      console.log('Datos Whatsapp', this.datosCliente);
    });

  }

  createForm() {
    this.whatsappForm = new FormGroup({
      WhatsApp: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    });
  }

  showDialog(position: DialogPosition = 'top'): void {
    this.position = position;
    this.visible = true;
  }

  setFormValues() {
    this.whatsappForm.patchValue({
      WhatsApp: this.datosCliente.whatsapp
    });
    this.cd.detectChanges();
  }

  cancelar() {
    this.visible = false;
    this.stateDatos.cancelarWhatsapp();
  }

  guardar() {
    this.loading = true;
    this.datosCliente.whatsapp = this.whatsappForm.value.WhatsApp;
    console.log('WhatsApp Object', this.datosCliente);

    this.datosService.guardarWhatsapp(this.datosCliente).subscribe(resp => {
      console.log('FromBackend', resp);
      this.visible = false;
      this.stateDatos.savedWhatsapp();
    }, error => {
      console.log('error', error);
      this.visible = false;
      this.stateDatos.cancelarWhatsapp();
      Swal.fire({ title: 'Error al guardar', text: '', icon: 'warning' });
    });
  }

}
