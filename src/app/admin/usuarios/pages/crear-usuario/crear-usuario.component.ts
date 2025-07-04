import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../../shared/services/state.service';
import { UsuarioService } from '../../usuario.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { UsuarioModel } from '../../usuario.model';

type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css',
  providers: [MessageService]
})

export class CrearUsuarioComponent implements OnInit {
  visible: boolean = false;
  position: DialogPosition = 'top';
  userForm!: FormGroup;
  roles: any[] = [];
  usuario!: UsuarioModel;
  loading: boolean = false;

  constructor(
    private stateService: StateService,
    private usuarioService: UsuarioService
  ) {

  }

  ngOnInit(): void {
    this.showDialog();
    this.createForm();

    this.usuarioService.getRoles().subscribe(resp => {
      this.roles = resp;
      console.log('Roles', this.roles);
    }, error => error);
  }

  createForm() {
    this.userForm = new FormGroup({
      Nombre: new FormControl('', [Validators.required]),
      Correo: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      Phone: new FormControl('', [Validators.pattern(/^\d{10}$/)])
    });
  }

  showDialog(position: DialogPosition = 'top'): void {
    this.position = position;
    this.visible = true;
  }

  cancelar() {
    this.visible = false;
    this.stateService.cancelarAgregar();
  }

  guardar() {
    this.loading = true;
    this.usuario = new UsuarioModel();
    this.usuario.nombre = this.userForm.value.Nombre;
    this.usuario.correo = this.userForm.value.Correo;
    this.usuario.password = this.userForm.value.Password;
    this.usuario.phone = this.userForm.value.Phone;

    console.log('Cliente Usuario', this.usuario)

    this.usuarioService.saveUser(this.usuario).subscribe(resp => {
      console.log('resp', resp);
      this.stateService.saved();
      this.visible = false;
      Swal.fire({ title: 'Usuario guardado correctamente', text: '', icon: 'success' });

    }, error => {
      console.log('error', error);
      this.stateService.cancelarAgregar();
      this.visible = false;
      Swal.fire({ title: 'Error al crear el usuario', text: '', icon: 'warning' });
    });
  }

  private formatDate(fecha: any) {
    var fechaFormat = new Date(fecha);
    return fechaFormat.getFullYear() + "-" + ("0" + (fechaFormat.getMonth() + 1)).slice(-2) + "-" + ("0" + (fechaFormat.getDate())).slice(-2);
  }

}
