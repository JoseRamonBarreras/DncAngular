import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDatosService } from '../../../../services/datos.service';
import { StateDatosService } from '../../../../services/state-datos.service';
import { EnvioService } from '../../../../services/envio.service';
import { StateEnvioService } from '../../../../services/state-envio.service';
import Swal from 'sweetalert2';
import { EnvioModel } from '../../../../models/envio.model';

type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

@Component({
  selector: 'app-rangos',
  templateUrl: './rangos.component.html',
  styleUrl: './rangos.component.css'
})
export class RangosComponent {
  visible: boolean = false;
  position: DialogPosition = 'top';
  rangosForm!: FormGroup;
  loading: boolean = false;
  envio!: EnvioModel;

  constructor(
    private sharedDatos: SharedDatosService,
    private stateEnvio: StateEnvioService,
    private envioService: EnvioService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    console.log('Rangos Created')
    this.createForm();
    this.showDialog();
    this.loadRangos();
  }

  get rangos(): FormArray {
    return this.rangosForm.get('rangos') as FormArray;
  }

  private createForm() {
    this.rangosForm = this.fb.group({
      rangos: this.fb.array([])
    });
  }

  private loadRangos() {
    const clienteId = Number(localStorage.getItem('cliente_id'));
    this.envioService.envios(clienteId).subscribe(resp => {
      this.envio = resp.envio_config;
      const rangosData = resp.envio_config.rangos || [];

      console.log('Rangos Data', rangosData)

      rangosData.forEach((rango: any) => {
        this.rangos.push(this.createRangoGroup(rango));
      });

      this.cd.detectChanges();
    });
  }

  private createRangoGroup(rango: any = {}): FormGroup {
    return this.fb.group({
      km_min: [rango.km_min ?? 0, [Validators.required, Validators.min(0)]],
      km_max: [rango.km_max ?? '', [Validators.required, Validators.min(0)]],
      precio: [rango.precio ?? '', [Validators.required, Validators.min(0)]]
    });
  }

  addRango() {
    this.rangos.push(this.createRangoGroup());
  }

  removeRango(index: number) {
    this.rangos.removeAt(index);
  }

  showDialog(position: DialogPosition = 'top'): void {
    this.position = position;
    this.visible = true;
  }

  cancelar() {
    this.visible = false;
    this.stateEnvio.cancelarRangos();
  }

  guardar() {
    if (this.rangosForm.invalid) return;

    this.loading = true;

    const payload = {
      rangos: this.rangosForm.value.rangos
    };

    console.log('Rangos Array', payload);
    this.envioService.guardarRangos(this.envio.id, payload).subscribe(resp => {
      console.log('Guardar Rangos FromBackend', resp);
      this.visible = false;
      this.stateEnvio.savedRangos();
    }, error => {
      console.log('error', error);
      this.visible = false;
      this.stateEnvio.cancelarRangos();
      Swal.fire({ title: 'Error al guardar', text: '', icon: 'warning' });


    });
  }


}
