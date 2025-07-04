import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjustesComponent } from './pages/ajustes/ajustes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'negocio', component: AjustesComponent },
      { path: '**', redirectTo: 'negocio' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjustesRoutingModule { }
