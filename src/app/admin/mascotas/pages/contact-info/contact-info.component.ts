import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuarioModel } from '../../../usuarios/usuario.model';
import { UserProfileService } from '../../services/user-profile.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService,
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

    this.profileService.guardar(this.usuario).subscribe(resp => {
      console.log('from backend', resp);
      this.messageService.add({
        key: 'contact',
        severity: 'info',
        summary: 'Guardado',
        detail: 'Informacion actualizada'
      });
      this.loading = false;
    }, error => {
      console.log('error', error);
      this.messageService.add({
        key: 'contact',
        severity: 'danger',
        summary: 'Error',
        detail: 'Error al guardar'
      });
      this.loading = false;
    });
  }

}
