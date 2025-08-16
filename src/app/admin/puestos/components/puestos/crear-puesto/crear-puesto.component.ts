import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PuestoModel } from '../../../models/puesto.model';
import { StatePuestoService } from '../../../services/state-puesto.service';
import { PuestoService, SharedPuestoService } from '../../../services/puesto.service';
import { MessageService } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

@Component({
  selector: 'app-crear-puesto',
  templateUrl: './crear-puesto.component.html',
  styleUrl: './crear-puesto.component.css'
})
export class CrearPuestoComponent {
  visible: boolean = false;
  position: DialogPosition = 'left';
  puestoForm!: FormGroup;
  puesto!: PuestoModel;
  loading: boolean = false;
  isEditMode: boolean = false;
  loadingDatos: boolean = false;
  private puestoSubscription!: Subscription;

  constructor(
    private stateService: StatePuestoService,
    private puestoService: PuestoService,
    private sharedPuesto: SharedPuestoService,
    
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.showDialog();

    this.puestoSubscription = this.sharedPuesto.current.subscribe(puesto => {
      if (puesto.id) {
        this.puesto = puesto;
        this.isEditMode = true;
        this.loadingDatos = true;
        setTimeout(() => {
          this.setFormValues();
          this.loadingDatos = false;
        }, 1000);

        console.log('Puesto Edit', this.puesto);
      } else {
        this.puesto = new PuestoModel();
        this.isEditMode = false;
        this.loadingDatos = false;
        console.log('Puesto Create', this.puesto);
      }
    });

  }

  ngOnDestroy(): void {
    if (this.puestoSubscription) {
      this.puestoSubscription.unsubscribe();
    }
  }

  createForm() {
    this.puestoForm = new FormGroup({
      Nombre: new FormControl('', [Validators.required]),
      Descripcion: new FormControl(''),
    });
  }

  setFormValues() {
    this.puestoForm.patchValue({
      Nombre: this.puesto.nombre,
      Descripcion: this.puesto.descripcion,
    });

    this.cd.detectChanges();
  }

  resetForm() {
    this.puestoForm.reset();
    this.puesto = new PuestoModel();
    this.isEditMode = false;
  }

  showDialog(position: DialogPosition = 'topleft'): void {
    this.position = position;
    this.visible = true;
  }

  cancelar() {
    this.visible = false;
    this.stateService.cancelar();
    this.resetForm();
  }

  guardar() {
    this.loading = true;
    this.puesto.nombre = this.puestoForm.value.Nombre;
    this.puesto.descripcion = this.puestoForm.value.Descripcion;
    console.log('Puesto en crear', this.puesto);

    if (this.isEditMode) {
      this.puestoService.update(Number(localStorage.getItem('cliente_id')), this.puesto).subscribe(resp => {
        console.log('Puesto actualizada:', resp);
        this.loading = false;
        this.stateService.saved();
      }, error => {
        console.log('Error al actualizar:', error);
        Swal.fire('Error', 'Hubo un error al actualizar la puesto', 'error');
        this.loading = false;
        this.visible = false;
        this.resetForm();
        this.stateService.cancelar();
      });
    } else {
      this.puestoService.guardar(Number(localStorage.getItem('cliente_id')), this.puesto).subscribe(resp => {
        console.log('FromBackend', resp);
        this.loading = false;
        this.stateService.saved();

      }, error => {
        console.log('error', error);
        Swal.fire({ title: 'Error al guardar el puesto', text: '', icon: 'warning' });
        this.loading = false;
        this.visible = false;
        this.resetForm();
        this.stateService.cancelar();
      });
    }
  }


}
