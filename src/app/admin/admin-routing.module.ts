import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../core/role.guard';

const routes: Routes = [
  { 
    path: 'dashboard', 
    canActivate: [RoleGuard],
    data: { acceso: "DASHBOARD" },
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  { 
    path: 'usuarios', 
    canActivate: [RoleGuard],
    data: { acceso: "SISTEMAS" },
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) 
  },
  { 
    path: 'mascotas', 
    canActivate: [RoleGuard],
    data: { acceso: "GENERAR_QR" },
    loadChildren: () => import('./mascotas/mascotas.module').then(m => m.MascotasModule) 
  },
  {
    path: '**', redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
