import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MascotaRoutingModule } from './mascota-routing.module';



@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    MascotaRoutingModule
  ]
})
export class MascotaModule { }
