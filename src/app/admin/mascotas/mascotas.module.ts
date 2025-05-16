import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarMascotasComponent } from './pages/listar-mascotas/listar-mascotas.component';
import { CrearMascotaComponent } from './pages/crear-mascota/crear-mascota.component';
import { MascotasRoutingModule } from './mascotas-routing.module';
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
import { ReactiveFormsModule } from '@angular/forms';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ProgressBarModule } from 'primeng/progressbar';
import { SharedMascotaService } from './services/mascota.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CropImageComponent } from './pages/crear-mascota/components/crop-image/crop-image.component'; 
import { MessageService } from 'primeng/api';
import { InputMaskModule } from 'primeng/inputmask';
import { ContactInfoComponent } from './pages/contact-info/contact-info.component';


@NgModule({
  declarations: [
    ListarMascotasComponent,
    CrearMascotaComponent,
    CropImageComponent,
    ContactInfoComponent
  ],
  imports: [
    CommonModule,
    MascotasRoutingModule,
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
    ReactiveFormsModule,
    InputIconModule,
    IconFieldModule,
    ProgressBarModule,
    FileUploadModule,
    ImageCropperModule,
    InputMaskModule
  ],
  providers: [
    SharedMascotaService,
    MessageService
  ]
})
export class MascotasModule { }
