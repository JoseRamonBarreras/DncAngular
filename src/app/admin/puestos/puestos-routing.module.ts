import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PuestosConfigComponent } from './pages/puestos-config/puestos-config.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'config', component: PuestosConfigComponent },
      { path: '**', redirectTo: 'config' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuestosRoutingModule { }
