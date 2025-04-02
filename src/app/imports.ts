import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';


@NgModule({
  imports: [
    ButtonModule,
    CardModule,
    PasswordModule,
    InputTextModule,
    FloatLabelModule,
    MenubarModule,
    SidebarModule,
    PanelMenuModule,
    ProgressBarModule,
    TableModule,
    TagModule,
    IconFieldModule,
    InputIconModule
  ],
  exports: [
    ButtonModule,
    CardModule,
    PasswordModule,
    InputTextModule,
    FloatLabelModule,
    MenubarModule,
    SidebarModule,
    PanelMenuModule,
    ProgressBarModule,
    TableModule,
    TagModule,
    IconFieldModule,
    InputIconModule
  ]
})
export class ImportsModule { }
