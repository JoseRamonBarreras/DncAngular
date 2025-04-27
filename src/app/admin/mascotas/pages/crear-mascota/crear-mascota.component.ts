import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ComponentStateService } from '../../../shared/services/component-state.service';
import { StateService } from '../../../shared/services/state.service';
import { MascotaModel } from '../../mascota.model';
import { MascotaService, SharedMascotaService } from '../../mascota.service';
import { environment } from '../../../../../environments/environment';

type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrl: './crear-mascota.component.css'
})
export class CrearMascotaComponent {
  visible: boolean = false;
  position: DialogPosition = 'top';
  mascotaForm!: FormGroup;
  especies: any[] = [];
  mascota!: MascotaModel;
  loading: boolean = false;

  qrCodeUrl: string | null = null;
  fotoUrl: string | null = null;
  imagenPreview: string | ArrayBuffer | null = null;
  fotoDemo: string = environment.fotoDemo;
  baseUrl = environment.baseUrl;
  baseQr = environment.baseQr;

  isEditMode: boolean = false;

  displayCrop: boolean = false;
  fotoEditada: boolean = false;
  listener!: Subscription;

  constructor(
    private stateService: StateService,
    private mascotaService: MascotaService,
    private sharedMascota: SharedMascotaService,
    private componentState: ComponentStateService,
    private messageService: MessageService,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.showDialog();

    this.mascotaService.especies().subscribe(resp => {
      this.especies = resp;
      console.log('Especies', this.especies);
    }, error => error);

    this.sharedMascota.current.subscribe(mascota => {
      if (mascota.id) {
        this.mascota = mascota;
        this.isEditMode = true;
        this.fotoEditada = false;
        setTimeout(() => {
          this.setFormValues();
        }, 1000);

        console.log('Mascota Edit', this.mascota);
      } else {
        this.mascota = new MascotaModel();
        this.isEditMode = false;
        console.log('Mascota Create', this.mascota);
      }
    });

    this.listeners();
  }

  private listeners() {
    this.listener = this.componentState.currentAccion.subscribe((accion: any) => {
      console.log(accion);
      this.displayCrop = accion.displayCrop;
    });
  }

  createForm() {
    this.mascotaForm = new FormGroup({
      Nombre: new FormControl('', [Validators.required]),
      Birthday: new FormControl('', [Validators.required, this.yearLengthValidator]),
      Especie: new FormControl('', [Validators.required]),
      Telefono: new FormControl(''),
    });
  }

  private yearLengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const year = new Date(value).getFullYear().toString();
    return year.length === 4 ? null : { invalidYear: true };
  }

  setFormValues() {
    this.mascotaForm.patchValue({
      Nombre: this.mascota.name,
      Birthday: this.mascota.birthday,
      Especie: +this.mascota.especie_id,
      Telefono: this.mascota.phone
    });

    if (this.mascota.foto) {
      this.fotoDemo = this.baseUrl + this.mascota.foto;
    }
    this.cd.detectChanges();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.imagenPreview = base64;
        this.mascota.foto = base64;
      };
      reader.readAsDataURL(file);
    }
  }

  resetForm() {
    this.mascotaForm.reset();
    this.mascota = new MascotaModel();
    this.fotoDemo = environment.fotoDemo;
    this.isEditMode = false;
  }

  showDialog(position: DialogPosition = 'top'): void {
    this.position = position;
    this.visible = true;
  }

  subirImagen() {
    this.displayCrop = true;
  }

  parentFunctionCrop(base64: string) {
    console.log('Imagen recortada (base64):', base64);
    this.imagenPreview = base64;
    this.mascota.foto = base64;
    this.fotoEditada = true;
  }

  cancelar() {
    this.visible = false;
    this.stateService.cancelarAgregar();
    this.resetForm();
  }

  guardar() {
    this.loading = true;

    this.mascota.name = this.mascotaForm.value.Nombre;
    this.mascota.birthday = this.mascotaForm.value.Birthday;
    this.mascota.especie_id = this.mascotaForm.value.Especie;
    this.mascota.phone = this.mascotaForm.value.Telefono;
    this.mascota.user_id = Number(localStorage.getItem('user_id'));
    if (!this.fotoEditada && this.isEditMode) {
      delete this.mascota.foto;
    }

    console.log('Mascota en crear', this.mascota);

    if (this.isEditMode) {
      this.mascotaService.update(this.mascota).subscribe(resp => {
        console.log('Mascota actualizada:', resp);
        this.loading = false;
        this.sharedMascota.set(resp.mascota);
        this.messageService.add({
          severity: 'info',
          summary: 'Actualizado',
          detail: 'La mascota se actualizo correctamente'
        });
      }, error => {
        console.log('Error al actualizar:', error);
        Swal.fire('Error', 'Hubo un error al actualizar la mascota', 'error');
        this.loading = false;
        this.visible = false;
        this.resetForm();
        this.stateService.cancelarAgregar();
      });
    } else {
      this.mascotaService.guardar(this.mascota).subscribe(resp => {
        console.log('FromBackend', resp);
        this.loading = false;
        this.sharedMascota.set(resp.mascota);

        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'La mascota se guardó correctamente'
        });

      }, error => {
        console.log('error', error);
        Swal.fire({ title: 'Error al guardar el mascota', text: '', icon: 'warning' });
        this.loading = false;
        this.visible = false;
        this.resetForm();
        this.stateService.cancelarAgregar();
      });
    }
  }

  descargarQr(id: number): void {
    this.mascotaService.descargarQr(id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `qr_mascota_${id}.png`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar QR:', err);
      }
    });
  }

  get claseImagen(): string {
    const especie = this.mascotaForm.value.Especie;
    if (especie === 1) return 'img-perro';
    if (especie === 2) return 'img-gato';
    return '';
  }

  getEdad(fechaNacimiento: string): string {
    if (!fechaNacimiento) return 'Edad no disponible';

    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return `${edad} ${edad === 1 ? 'año' : 'años'}`;
  }

  private formatDate(fecha: any) {
    var fechaFormat = new Date(fecha);
    return fechaFormat.getFullYear() + "-" + ("0" + (fechaFormat.getMonth() + 1)).slice(-2) + "-" + ("0" + (fechaFormat.getDate())).slice(-2);
  }

}
