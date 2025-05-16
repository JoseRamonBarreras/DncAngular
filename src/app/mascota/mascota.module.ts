import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MascotaRoutingModule } from './mascota-routing.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    MascotaRoutingModule,
    CardModule,
    ButtonModule,
  ]
})
export class MascotaModule { }
