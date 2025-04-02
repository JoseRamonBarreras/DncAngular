import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from '../../usuario.model';
import { StateService } from '../../../shared/services/state.service';
import { SharedUsuarioService, UsuarioService } from '../../usuario.service';
import { Password } from 'primeng/password';
import Swal from 'sweetalert2';

type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrl: './cambiar-password.component.css'
})
export class CambiarPasswordComponent implements OnInit {
  visible: boolean = false;
  position: DialogPosition = 'center';
  passwordForm!: FormGroup;
  usuario!: UsuarioModel;
  loading: boolean = false;

  constructor(
    private stateService: StateService,
    private usuarioService: UsuarioService,
    private sharedUsuario: SharedUsuarioService
  ) {

  }

  ngOnInit(): void {
    this.sharedUsuario.current.subscribe(resp => {
      this.usuario = resp;
      console.log('Usuario current', this.usuario);
      this.showDialog();
    this.createForm();
    }, error => error);
    
  }

  createForm() {
    this.passwordForm = new FormGroup({
      Password: new FormControl('', [Validators.required])
    });
  }

  showDialog(position: DialogPosition = 'center'): void {
    this.position = position;
    this.visible = true;
  }

  cancelar() {
    this.visible = false;
    this.stateService.cancelarPassword();
  }

  guardar() {
    this.loading = true;
    this.usuarioService.resetPassword(this.usuario.id, this.passwordForm.value.Password).subscribe(resp => {
      console.log('resp', resp);
      this.stateService.cancelarPassword();
      this.visible = false;
      Swal.fire({ title: 'Password actualizado correctamente', text: '', icon: 'success' });
    }, error =>{
      console.log('error', error);
      this.stateService.cancelarPassword();
      this.visible = false;
      Swal.fire({ title: 'Error al cambiar password', text: '', icon: 'warning' });
    });
  }
  
}
