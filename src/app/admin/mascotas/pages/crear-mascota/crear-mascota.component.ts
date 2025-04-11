import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MascotaModel } from '../../mascota.model';
import { StateService } from '../../../shared/services/state.service';
import { MascotaService, SharedMascotaService } from '../../mascota.service';
import Swal from 'sweetalert2';

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
  fotoDemo: string = "./img/icons/petdemo.png";
  baseUrl = 'http://127.0.0.1:8000/storage/mascotas/';

  isEditMode: boolean = false;


  constructor(
    private stateService: StateService,
    private mascotaService: MascotaService,
    private sharedMascota: SharedMascotaService
  ) {

  }

  ngOnInit(): void {
    this.showDialog();
    this.createForm();

    this.mascotaService.especies().subscribe(resp => {
      this.especies = resp;
      console.log('Especies', this.especies);
    }, error => error);

    this.sharedMascota.current.subscribe(mascota => {
      if (mascota.id) {
        this.mascota = mascota;
        this.isEditMode = true;
        this.setFormValues();
      } else {
        this.mascota = new MascotaModel();
        this.isEditMode = false;
      }
    });
  }

  createForm() {
    this.mascotaForm = new FormGroup({
      Foto: new FormControl(''),
      Nombre: new FormControl('', [Validators.required]),
      Birthday: new FormControl('', [Validators.required]),
      Especie: new FormControl('', [Validators.required]),
      Telefono: new FormControl(''),
    });
  }

  setFormValues() {
    this.mascotaForm.patchValue({
      Nombre: this.mascota.name,
      Birthday: this.mascota.birthday,
      Especie: this.mascota.especie_id,
      Telefono: this.mascota.phone
    });

    if (this.mascota.foto) {
      this.fotoDemo = this.baseUrl + this.mascota.foto;
    }
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
    this.fotoDemo = "./img/icons/petdemo.png";
    this.isEditMode = false;
  }

  showDialog(position: DialogPosition = 'top'): void {
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

    this.mascota.name = this.mascotaForm.value.Nombre;
    this.mascota.birthday = this.mascotaForm.value.Birthday;
    this.mascota.especie_id = this.mascotaForm.value.Especie;
    this.mascota.phone = this.mascotaForm.value.Telefono;
    this.mascota.user_id = Number(localStorage.getItem('user_id'));

    if (this.mascotaForm.get('Foto')?.pristine) {
      delete this.mascota.foto;
    }

    console.log('Mascota en crear', this.mascota);

    if (this.isEditMode) {
      this.mascotaService.update(this.mascota).subscribe(resp => {
        console.log('Mascota actualizada:', resp);
        Swal.fire('Actualizado!', 'Mascota actualizada correctamente', 'success');
        this.loading = false;
        this.visible = false;
        this.resetForm();
        this.stateService.saved();
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
        Swal.fire({ title: 'Mascota guardada correctamente', text: '', icon: 'success' });
        this.loading = false;
        this.visible = false;
        this.resetForm();
        this.stateService.saved();
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

  generarQR() {
    const data = this.mascotaForm.value.Nombre; // Puedes concatenar más info si quieres
    // Suponiendo que tienes un servicio que te genera la imagen QR:
    //this.qrCodeUrl = this.qrService.generarQRComoDataURL(data); // solo ejemplo
  }


  private formatDate(fecha: any) {
    var fechaFormat = new Date(fecha);
    return fechaFormat.getFullYear() + "-" + ("0" + (fechaFormat.getMonth() + 1)).slice(-2) + "-" + ("0" + (fechaFormat.getDate())).slice(-2);
  }

}
