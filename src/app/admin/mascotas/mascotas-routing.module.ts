import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListarMascotasComponent } from './pages/listar-mascotas/listar-mascotas.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listado', component: ListarMascotasComponent },
      { path: '**', redirectTo: 'listado' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotasRoutingModule { }
