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



@NgModule({
  declarations: [
    AjustesComponent,
    GeneralComponent,
    DatosComponent
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
    InputSwitchModule
  ]
})
export class AjustesModule { }
