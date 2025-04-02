import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarUsuariosComponent } from './pages/listar-usuarios/listar-usuarios.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'listado', component: ListarUsuariosComponent},
      {path: '**', redirectTo: 'listado'}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
