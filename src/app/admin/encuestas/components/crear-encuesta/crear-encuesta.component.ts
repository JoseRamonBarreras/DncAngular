import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EncuestaModel } from '../../models/encuesta.model';
import { Subscription } from 'rxjs';
import { StateService } from '../../../shared/services/state.service';
import { EncuestaService, SharedEncuestaService } from '../../services/encuesta.service';
import { PuestoService } from '../../../puestos/services/puesto.service';
import Swal from 'sweetalert2';

type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

@Component({
  selector: 'app-crear-encuesta',
  templateUrl: './crear-encuesta.component.html',
  styleUrl: './crear-encuesta.component.css'
})
export class CrearEncuestaComponent {
  puestos: any[] = [];
  visible: boolean = false;
  position: DialogPosition = 'left';
  encuestaForm!: FormGroup;
  encuesta!: EncuestaModel;
  loading: boolean = false;
  isEditMode: boolean = false;
  loadingDatos: boolean = false;
  private encuestaSubscription!: Subscription;

  constructor(
    private stateService: StateService,
    private encuestaService: EncuestaService,
    private sharedEncuesta: SharedEncuestaService,
    private cd: ChangeDetectorRef,
    private puestoService: PuestoService
  ) {

  }

  ngOnInit(): void {
    this.getPuestos();
    this.showDialog();
    this.encuestaSubscription = this.sharedEncuesta.current.subscribe(encuesta => {
      if (encuesta.id) {
        this.encuesta = encuesta;
        this.isEditMode = true;
        this.loadingDatos = true;
        this.createForm();
        setTimeout(() => {
          this.setFormValues();
          this.loadingDatos = false;
        }, 1000);

        console.log('Encuesta Edit', this.encuesta);
      } else {
        this.encuesta = new EncuestaModel();
        this.isEditMode = false;
        this.loadingDatos = false;
        this.createForm();
        console.log('Encuesta Create', this.encuesta);
      }
    });

  }

  ngOnDestroy(): void {
    if (this.encuestaSubscription) {
      this.encuestaSubscription.unsubscribe();
    }
  }

  private getPuestos() {
    this.puestoService.puestos(Number(localStorage.getItem('cliente_id'))).subscribe(resp => {
      this.puestos = resp.puestos;
      console.log('Puestos', this.puestos);
    }, error => error);
  }


  createForm() {
    this.encuestaForm = new FormGroup({
      Titulo: new FormControl('', [Validators.required]),
      Descripcion: new FormControl('', [Validators.required]),
      Puesto: new FormControl('', [Validators.required]),
    });
  }

  setFormValues() {
    this.encuestaForm.patchValue({
      Titulo: this.encuesta.titulo,
      Descripcion: this.encuesta.descripcion,
      Puesto: this.encuesta.puesto
    });

    this.cd.detectChanges();
  }

  resetForm() {
    this.encuestaForm.reset();
    this.encuesta = new EncuestaModel();
    this.isEditMode = false;
  }

  showDialog(position: DialogPosition = 'center'): void {
    this.position = position;
    this.visible = true;
  }

  cancelar() {
    this.visible = false;
    this.stateService.cancelarAgregar();
    this.resetForm();
  }

  guardar() {
    this.loading = true;
    this.encuesta.titulo = this.encuestaForm.value.Titulo;
    this.encuesta.descripcion = this.encuestaForm.value.Descripcion;
    this.encuesta.puesto = this.encuestaForm.value.Puesto;

    console.log('Encuesta en crear', this.encuesta);

    if (this.isEditMode) {
      this.encuestaService.update(Number(localStorage.getItem('cliente_id')), Number(localStorage.getItem('user_id')), this.encuesta).subscribe(resp => {
        console.log('Enuesta actualizada:', resp);
        this.loading = false;
        this.stateService.saved();
      }, error => {
        console.log('Error al actualizar:', error);
        Swal.fire('Error', 'Hubo un error al actualizar el encuesta', 'error');
        this.loading = false;
        this.visible = false;
        this.resetForm();
        this.stateService.cancelarEditar();
      });
    } else {
      this.encuestaService.guardar(Number(localStorage.getItem('cliente_id')), Number(localStorage.getItem('user_id')), this.encuesta).subscribe(resp => {
        console.log('FromBackend', resp);
        this.loading = false;
        this.stateService.saved();

      }, error => {
        console.log('error', error);
        Swal.fire({ title: 'Error al guardar la encuesta', text: '', icon: 'warning' });
        this.loading = false;
        this.visible = false;
        this.resetForm();
        this.stateService.cancelarAgregar();
      });
    }
  }

}
