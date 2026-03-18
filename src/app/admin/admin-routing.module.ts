import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../core/role.guard';

const routes: Routes = [
  // { 
  //   path: 'dashboard', 
  //   canActivate: [RoleGuard],
  //   data: { acceso: "DASHBOARD" },
  //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) 
  // },
  { 
    path: 'ajustes', 
    canActivate: [RoleGuard],
    data: { acceso: "AJUSTES" },
    loadChildren: () => import('./ajustes/ajustes.module').then(m => m.AjustesModule) 
  },
  { 
    path: 'puestos', 
    canActivate: [RoleGuard],
    data: { acceso: "PUESTOS" },
    loadChildren: () => import('./puestos/puestos.module').then(m => m.PuestosModule) 
  },
  { 
    path: 'encuestas', 
    canActivate: [RoleGuard],
    data: { acceso: "ENCUESTAS" },
    loadChildren: () => import('./encuestas/encuestas.module').then(m => m.EncuestasModule) 
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
    path: '**', redirectTo: 'ajustes'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
