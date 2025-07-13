import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralClienteModel } from '../../../models/general-cliente.model';
import { AjusteService, SharedGeneralService } from '../../../services/ajuste.service';
import { StateGeneralService } from '../../../services/state-general.service';
import Swal from 'sweetalert2';

type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.component.html',
  styleUrl: './nombre.component.css'
})
export class NombreComponent {
  visible: boolean = false;
  position: DialogPosition = 'top';
  nombreForm!: FormGroup;
  generalCliente!: GeneralClienteModel;
  loading: boolean = false;

  constructor(
    private sharedGeneral: SharedGeneralService,
    private stateGeneral: StateGeneralService,
    private ajusteService: AjusteService,
    private cd: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.showDialog();

    this.sharedGeneral.current.subscribe(general => {
        this.generalCliente = general;
        setTimeout(() => {
          this.setFormValues();
        }, 1000);
      console.log('General Nombre', this.generalCliente);
    });

  }

  createForm() {
      this.nombreForm = new FormGroup({
        Nombre: new FormControl('', [Validators.required]),
      });
    }

  showDialog(position: DialogPosition = 'top'): void {
    this.position = position;
    this.visible = true;
  }

  setFormValues() {
    this.nombreForm.patchValue({
      Nombre: this.generalCliente.nombre
    });
    this.cd.detectChanges();
  }

  cancelar() {
    this.visible = false;
    this.stateGeneral.cancelarNombre();
  }

  guardar() {
      this.loading = true;
      this.generalCliente.nombre = this.nombreForm.value.Nombre;
      console.log('Nombre Object', this.generalCliente);

      this.ajusteService.guardarNombre(Number(localStorage.getItem('cliente_id')), this.generalCliente.nombre).subscribe(resp => {
        console.log('FromBackend', resp);
        this.visible = false;
        this.stateGeneral.savedNombre();
      }, error => {
        console.log('error', error);
        this.visible = false;
        this.stateGeneral.cancelarNombre();
        Swal.fire({ title: 'Error al guardar', text: '', icon: 'warning' });
  
  
      });
    }


}
