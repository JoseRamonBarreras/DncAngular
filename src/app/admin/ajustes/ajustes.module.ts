import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AjustesRoutingModule } from './ajustes-routing.module';
import { AjustesComponent } from './pages/ajustes/ajustes.component';
import { GeneralComponent } from './components/general/general.component';
import { DatosComponent } from './components/datos/datos.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { GeneralSkeletonComponent } from './components/general/general-skeleton/general-skeleton.component';
import { LogoComponent } from './components/general/logo/logo.component';
import { PortadaComponent } from './components/general/portada/portada.component';
import { NombreComponent } from './components/general/nombre/nombre.component';
import { MessageService } from 'primeng/api';
import { SharedGeneralService } from './services/ajuste.service';
import { DatosSkeletonComponent } from './components/datos/datos-skeleton/datos-skeleton.component';
import { DireccionComponent } from './components/datos/direccion/direccion.component';
import { WhatsAppComponent } from './components/datos/whats-app/whats-app.component';
import { SharedDatosService } from './services/datos.service';
import { SidebarModule } from 'primeng/sidebar';
import { HorarioComponent } from './components/datos/horario/horario.component';
import { EnvioComponent } from './components/datos/envio/envio.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RangosComponent } from './components/datos/envio/rangos/rangos.component';



@NgModule({
  declarations: [
    AjustesComponent,
    GeneralComponent,
    DatosComponent,
    GeneralSkeletonComponent,
    LogoComponent,
    PortadaComponent,
    NombreComponent,
    DatosSkeletonComponent,
    DireccionComponent,
    WhatsAppComponent,
    HorarioComponent,
    EnvioComponent,
    RangosComponent
  ],
  imports: [
    CommonModule,
    AjustesRoutingModule,
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
    FileUploadModule,
    ImageCropperModule,
    InputMaskModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    SkeletonModule,
    SidebarModule,
    ToggleButtonModule,
    RadioButtonModule
  ],
  providers: [
      SharedGeneralService,
      SharedDatosService,
      MessageService
    ]
})
export class AjustesModule { }
