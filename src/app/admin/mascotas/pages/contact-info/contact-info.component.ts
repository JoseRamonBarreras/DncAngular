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
  privacyControl: boolean = false;

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
      this.privacyControl = !!resp.privacy_control;
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
      Phone: this.usuario.phone

    });
    // this.cd.detectChanges();
  }

  onPrivacyToggle(event: boolean) {
    this.privacyControl = event;
    console.log('Privacidad activada:', this.privacyControl);

    let params = {userId: Number(localStorage.getItem('user_id')), control: event };

     this.profileService.switchControl(params).subscribe(resp => {
      console.log('from backend', resp);
      this.messageService.add({
        key: 'contact',
        severity: 'info',
        summary: 'Guardado',
        detail: 'Control de privacidad'
      });
    }, error => {
      console.log('error', error);
      this.messageService.add({
        key: 'contact',
        severity: 'danger',
        summary: 'Error',
        detail: 'Error al guardar'
      });
    });
  }

  guardar() {
    this.loading = true;

    this.usuario.phone = this.contactForm.value.Phone;
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
