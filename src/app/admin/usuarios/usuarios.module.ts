import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CambiarPasswordComponent } from './pages/cambiar-password/cambiar-password.component';
import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { ListarUsuariosComponent } from './pages/listar-usuarios/listar-usuarios.component';
import { SharedUsuarioService } from './usuario.service';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { InputMaskModule } from 'primeng/inputmask';



@NgModule({
  declarations: [
    ListarUsuariosComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    CambiarPasswordComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    CardModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    DropdownModule,
    ToastModule,
    RippleModule,
    MessagesModule,
    MessageModule , 
    ReactiveFormsModule,
    InputIconModule,
    IconFieldModule,
    ProgressBarModule,
    InputMaskModule
  ],
  providers:[
    SharedUsuarioService
  ]
})
export class UsuariosModule { }
