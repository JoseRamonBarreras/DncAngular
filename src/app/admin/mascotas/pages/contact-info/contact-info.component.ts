import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuarioModel } from '../../../usuarios/usuario.model';
import { UserProfileService } from '../../services/user-profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css'
})
export class ContactInfoComponent implements OnInit {
  contactForm!: FormGroup;
  roles: any[] = [];
  usuario!: UsuarioModel;
  loading: boolean = false;

  constructor(
    private profileService: UserProfileService,
  ) {

  }

  ngOnInit(): void {
    this.createForm()

    this.profileService.getUser(Number(localStorage.getItem('user_id'))).subscribe(resp => {
      this.usuario = new UsuarioModel();
      this.usuario = resp;
      console.log('profile', this.usuario);
      this.setFormValues();
    });
  }

  createForm() {
    this.contactForm = new FormGroup({
      Phone: new FormControl(''),
      Address: new FormControl('')
    });
  }

  setFormValues() {
    this.contactForm.patchValue({
      Phone: this.usuario.phone,
      Address: this.usuario.address,

    });
    // this.cd.detectChanges();
  }

  guardar() {
    this.loading = true;
    this.usuario.phone = this.contactForm.value.Phone;
    this.usuario.address = this.contactForm.value.Address;
    console.log('Profile', this.usuario);

    // this.usuarioService.updateUser(this.usuario).subscribe(resp => {
    //   console.log('from backend', resp);
    //   this.stateService.updated();
    //   this.visible = false;
    //   Swal.fire({ title: 'Usuario actualizado correctamente', text: '', icon: 'success' });

    // }, error => {
    //   console.log('error', error);
    //   this.stateService.cancelarEditar();
    //   this.visible = false;
    //   Swal.fire({ title: 'Error al editar el usuario', text: '', icon: 'warning' });
    // });
  }

}
