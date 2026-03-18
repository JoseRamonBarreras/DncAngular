import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EncuestasRoutingModule } from './encuestas-routing.module';
import { EncuestasComponent } from './pages/encuestas/encuestas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MessageService } from 'primeng/api';
import { SharedEncuestaService } from './services/encuesta.service';
import { CrearEncuestaComponent } from './components/crear-encuesta/crear-encuesta.component';



@NgModule({
  declarations: [
    EncuestasComponent,
    CrearEncuestaComponent
  ],
  imports: [
    CommonModule,
    EncuestasRoutingModule,
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
    SharedEncuestaService,
    MessageService,
  ]
})
export class EncuestasModule { }
