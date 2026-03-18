import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EncuestasComponent } from './pages/encuestas/encuestas.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lista', component: EncuestasComponent },
      { path: '**', redirectTo: 'lista' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestasRoutingModule { }
