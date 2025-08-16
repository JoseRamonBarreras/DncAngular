import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuestosConfigComponent } from './pages/puestos-config/puestos-config.component';
import { PuestosRoutingModule } from './puestos-routing.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PuestosComponent } from './components/puestos/puestos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MessageService } from 'primeng/api';
import { SharedPuestoService } from './services/puesto.service';
import { CrearPuestoComponent } from './components/puestos/crear-puesto/crear-puesto.component';



@NgModule({
  declarations: [
    PuestosConfigComponent,
    PuestosComponent,
    UsuariosComponent,
    CrearPuestoComponent
  ],
  imports: [
    CommonModule,
    PuestosRoutingModule,
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
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    InputIconModule,
    IconFieldModule,
    ProgressBarModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    SkeletonModule,
    ToggleButtonModule,
    RadioButtonModule
  ],
  providers: [
    SharedPuestoService,
    MessageService
  ]
})
export class PuestosModule { }
