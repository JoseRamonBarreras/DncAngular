import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../shared/services/state.service';
import { SharedUsuarioService, UsuarioService } from '../../usuario.service';
import { UsuarioModel } from '../../usuario.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {
  visible: boolean = false;
  position: DialogPosition = 'top';
  userEditForm!: FormGroup;
  roles: any[] = [];
  usuario!: UsuarioModel;

  loading: boolean = false;

  constructor(
    private stateService: StateService,
    private usuarioService: UsuarioService,
    private sharedUsuario: SharedUsuarioService
  ) {

  }

  ngOnInit(): void {
    this.createForm()

    this.usuarioService.getRoles().subscribe(resp => {
      this.roles = resp;
      console.log('R', this.roles);
      this.userEditForm.get('Roles')?.setValue(this.roles.find(e => e.rol === this.usuario.rol));
    }, error => error);

    this.sharedUsuario.current.subscribe(resp => {
      this.usuario = resp;
      console.log('Usuario current', this.usuario);
      this.userEditForm.get('Nombre')?.setValue(this.usuario.nombre);
      this.userEditForm.get('Correo')?.setValue(this.usuario.correo);
      this.userEditForm.get('FavoritePet')?.setValue(this.usuario.favorite_pet);
      this.showDialog();
      
    }, error => error);
  }


  createForm() {
    this.userEditForm = new FormGroup({
      Nombre: new FormControl('', [Validators.required]),
      Correo: new FormControl('', [Validators.required]),
      Roles: new FormControl('', [Validators.required]),
      FavoritePet: new FormControl('', [Validators.required])
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
    this.usuario.nombre = this.userEditForm.value.Nombre;
    this.usuario.correo = this.userEditForm.value.Correo;
    this.usuario.password = this.userEditForm.value.Password;
    this.usuario.rol = this.userEditForm.value.Roles.id;
    this.usuario.favorite_pet = this.userEditForm.value.FavoritePet;

    this.usuarioService.updateUser(this.usuario).subscribe(resp => {
      console.log('from backend', resp);
      this.stateService.updated();
      this.visible = false;
      Swal.fire({ title: 'Usuario actualizado correctamente', text: '', icon: 'success' });

    }, error => {
      console.log('error', error);
      this.stateService.cancelarEditar();
      this.visible = false;
      Swal.fire({ title: 'Error al editar el usuario', text: '', icon: 'warning' });
    });
  }

  private formatDate(fecha: any) {
    var fechaFormat = new Date(fecha);
    return fechaFormat.getFullYear() + "-" + ("0" + (fechaFormat.getMonth() + 1)).slice(-2) + "-" + ("0" + (fechaFormat.getDate())).slice(-2);
  }

}
