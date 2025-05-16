import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MascotaModel } from '../../../admin/mascotas/mascota.model';
import { PerfilService } from '../../perfil.service';
import { UsuarioModel } from '../../../admin/usuarios/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  mascotaId!: number;
  mascota: MascotaModel = new MascotaModel();
  contactPhone: string = '';
  contactAddress: string = '';
  fotoDemo: string = environment.fotoDemo;
  baseUrl = environment.baseUrl;
  baseQr = environment.baseQr;

  constructor(
    private route: ActivatedRoute,
    private perfilService: PerfilService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.mascotaId = Number(params.get('id'));
      console.log('Id mascota', this.mascotaId);
      this.obtenerMascota(this.mascotaId);
    });
  }

  obtenerMascota(id: number): void {

    this.perfilService.obtenerPerfil(id).subscribe(resp => {
      console.log('From Backend', resp);
      this.mascota = resp.mascota;
      this.contactPhone = resp.mascota.phone;
      this.contactAddress = resp.mascota.address;
      console.log('Perfil', this.mascota);
      console.log('contactPhone', this.contactPhone);
    }, error => {
      console.error('Error cargando mascota:', error);
    });
  }

  getEdad(fechaNacimiento: string): string {
    if (!fechaNacimiento) return 'Edad no disponible';
  
    const nacimiento = new Date(fechaNacimiento);
    if (isNaN(nacimiento.getTime())) return 'Fecha inválida';
  
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
  
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
  
    return `${edad} ${edad === 1 ? 'año' : 'años'}`;
  }
  
}
