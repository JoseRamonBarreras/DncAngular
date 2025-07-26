import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatosClienteModel } from '../../../models/datos-cliente.model';
import { SharedDatosService } from '../../../services/datos.service';
import { StateDatosService } from '../../../services/state-datos.service';
import { EnvioService } from '../../../services/envio.service';
import { EnvioModel } from '../../../models/envio.model';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { StateEnvioService } from '../../../services/state-envio.service';

type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrl: './envio.component.css'
})
export class EnvioComponent {
  visible: boolean = false;
  position: DialogPosition = 'top';
  envioForm!: FormGroup;
  datosCliente!: DatosClienteModel;
  loading: boolean = false;
  rangos: any[] = [];
  envio!: EnvioModel;
  tipos: any[] = [];
  listener!: Subscription;
  displayRangos: boolean = false;

  constructor(
    private sharedDatos: SharedDatosService,
    private stateDatos: StateDatosService,
    private stateEnvio: StateEnvioService,
    private envioService: EnvioService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    console.log('Envio Created')
    this.createForm();
    this.showDialog();
    this.getEnvioCliente();
    this.listeners();
  }

  ngOnDestroy(): void {
    console.log('Envio Destroyed')
  }

  private listeners() {
    this.listener = this.stateEnvio.currentAccion.subscribe((accion: any) => {
      console.log('Accion', accion);
      this.displayRangos = accion.displayRangos;
      if (accion.guardado == true) {
        this.getEnvioCliente();
      }
    });
  }

  private getEnvioCliente() {
    const clienteId = Number(localStorage.getItem('cliente_id'));

    this.envioService.envios(clienteId).subscribe(
      (resp) => {
        console.log('Fromackend', resp);
        this.envio = resp.envio_config;
        this.rangos = resp.envio_config.rangos;
        setTimeout(() => {
          this.setFormValues();
          this.listenersForm();
        }, 1000);

        console.log('Envio', this.envio);
      },
      (error) => {
        console.error('Error al cargar envio', error);
      }
    );
  }

  createForm() {
    this.envioForm = new FormGroup({
      EntregaDomicilio: new FormControl('', [Validators.required]),

      RecogerSucursal: new FormControl('', [Validators.required])
    });
  }

  private setFormValues() {
    const entrega = !!this.envio.permite_entrega_domicilio;
    const recoger = !!this.envio.permite_recoger_sucursal;

    this.envioForm.patchValue({
      EntregaDomicilio: entrega,
      RecogerSucursal: recoger
    });

    if (entrega) {
      this.addTipoCosto(this.envio.tipo_envio_id);
    }

    this.cd.detectChanges();
  }

  private listenersForm() {
    this.entregaDomicilio?.valueChanges.subscribe((entrega: boolean) => {
      if (entrega) {
        this.addTipoCosto(this.envio.tipo_envio_id);
      } else {
        this.removeTipoCosto();
        this.removePrecioFijo();
      }

      this.cd.detectChanges();
    });

    this.envioForm.get('TipoCosto')?.valueChanges.subscribe((tipo: number) => {
      if (tipo === 1) {
        this.addPrecioFijo(this.envio.precio_fijo);
      } else {
        this.removePrecioFijo();
      }

      this.cd.detectChanges();
    });
  }


  private addTipoCosto(valor: number | null = null) {
    if (!this.envioForm.get('TipoCosto')) {
      this.envioForm.addControl('TipoCosto', new FormControl(valor, Validators.required));
    }

    if (valor === 1) {
      this.addPrecioFijo(this.envio.precio_fijo);
    } else {
      this.removePrecioFijo();
    }
  }

  private removeTipoCosto() {
    if (this.envioForm.get('TipoCosto')) {
      this.envioForm.removeControl('TipoCosto');
    }
  }

  private addPrecioFijo(valor: number | null = null) {
    if (!this.envioForm.get('PrecioFijo')) {
      this.envioForm.addControl('PrecioFijo', new FormControl(valor, Validators.required));
    }
  }

  private removePrecioFijo() {
    if (this.envioForm.get('PrecioFijo')) {
      this.envioForm.removeControl('PrecioFijo');
    }
  }

  get entregaDomicilio() { return this.envioForm.get('EntregaDomicilio') }

  get entregaDomicilioActiva(): boolean {
    return this.envioForm.get('EntregaDomicilio')?.value;
  }


  showDialog(position: DialogPosition = 'top'): void {
    this.position = position;
    this.visible = true;
  }

  cancelar() {
    this.visible = false;
    this.stateDatos.cancelarEnvio();
  }

  guardar() {
    this.loading = true;
    console.log('Guardando horarios', this.envioForm.value);
    this.envioService.guardarEnvio(Number(localStorage.getItem('cliente_id')), this.envioForm.value).subscribe(resp => {
      console.log('Guardar Envio FromBackend', resp);
      this.visible = false;
      this.stateDatos.savedEnvio();
    }, error => {
      console.log('error', error);
      this.visible = false;
      this.stateDatos.cancelarEnvio();
      Swal.fire({ title: 'Error al guardar', text: '', icon: 'warning' });


    });
  }

  actualizarRangos() {
    this.displayRangos = true;
  }


}
