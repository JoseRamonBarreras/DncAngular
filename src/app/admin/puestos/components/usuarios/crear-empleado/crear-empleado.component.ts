import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioEmpleadoModel } from '../../../models/usuario-empleado.model';
import { Subscription } from 'rxjs';
import { StateUsuarioEmpleadoService } from '../../../services/state-usuario-empleado.service';
import { SharedUsuarioEmpleadoService, UsuarioEmpleadoService } from '../../../services/usuario-empleado.service';
import { PuestoService } from '../../../services/puesto.service';
import Swal from 'sweetalert2';

type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrl: './crear-empleado.component.css'
})
export class CrearEmpleadoComponent {
  puestos: any[] = [];
  visible: boolean = false;
  position: DialogPosition = 'left';
  usuarioForm!: FormGroup;
  usuario!: UsuarioEmpleadoModel;
  loading: boolean = false;
  isEditMode: boolean = false;
  loadingDatos: boolean = false;
  private usuarioSubscription!: Subscription;

  constructor(
    private stateService: StateUsuarioEmpleadoService,
    private usuarioService: UsuarioEmpleadoService,
    private sharedUsuario: SharedUsuarioEmpleadoService,
    private cd: ChangeDetectorRef,
    private puestoService: PuestoService
  ) {

  }

  ngOnInit(): void {
    this.getPuestos();
    
    this.showDialog();

    this.usuarioSubscription = this.sharedUsuario.current.subscribe(usuario => {
      if (usuario.id) {
        this.usuario = usuario;
        this.isEditMode = true;
        this.loadingDatos = true;
        this.createForm();
        setTimeout(() => {
          this.setFormValues();
          this.loadingDatos = false;
        }, 1000);

        console.log('Usuario Edit', this.usuario);
      } else {
        this.usuario = new UsuarioEmpleadoModel();
        this.isEditMode = false;
        this.loadingDatos = false;
        this.createForm();
        console.log('Usuario Create', this.usuario);
      }
    });

  }

  ngOnDestroy(): void {
    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe();
    }
  }

  private getPuestos() {
    this.puestoService.puestos(Number(localStorage.getItem('cliente_id'))).subscribe(resp => {
      this.puestos = resp.puestos;
      console.log('Puestos', this.puestos);
    }, error => error);
  }


  createForm() {
    this.usuarioForm = new FormGroup({
      Nombre: new FormControl('', [Validators.required]),
      Correo: new FormControl('', [Validators.required]),
      Puesto: new FormControl('', [Validators.required]),
    });

    if (!this.isEditMode) {
      this.usuarioForm.addControl('Password', new FormControl('', [Validators.required]));
    }
  }

  setFormValues() {
    this.usuarioForm.patchValue({
      Nombre: this.usuario.nombre,
      Correo: this.usuario.correo,
      Puesto: this.usuario.puesto
    });

    this.cd.detectChanges();
  }

  resetForm() {
    this.usuarioForm.reset();
    this.usuario = new UsuarioEmpleadoModel();
    this.isEditMode = false;
  }

  showDialog(position: DialogPosition = 'topright'): void {
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
    this.usuario.nombre = this.usuarioForm.value.Nombre;
    this.usuario.correo = this.usuarioForm.value.Correo;
    this.usuario.puesto = this.usuarioForm.value.Puesto;

    if (!this.isEditMode) {
      this.usuario.password = this.usuarioForm.value.Password;
    }
    console.log('Usuario en crear', this.usuario);

    if (this.isEditMode) {
      this.usuarioService.update(Number(localStorage.getItem('cliente_id')), this.usuario).subscribe(resp => {
        console.log('Usuario actualizada:', resp);
        this.loading = false;
        this.stateService.saved();
      }, error => {
        console.log('Error al actualizar:', error);
        Swal.fire('Error', 'Hubo un error al actualizar el usuario', 'error');
        this.loading = false;
        this.visible = false;
        this.resetForm();
        this.stateService.cancelar();
      });
    } else {
      this.usuarioService.guardar(Number(localStorage.getItem('cliente_id')), this.usuario).subscribe(resp => {
        console.log('FromBackend', resp);
        this.loading = false;
        this.stateService.saved();

      }, error => {
        console.log('error', error);
        Swal.fire({ title: 'Error al guardar el usuario', text: '', icon: 'warning' });
        this.loading = false;
        this.visible = false;
        this.resetForm();
        this.stateService.cancelar();
      });
    }
  }

}
