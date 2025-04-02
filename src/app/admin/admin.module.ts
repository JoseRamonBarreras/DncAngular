import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { SidebarModule } from 'primeng/sidebar';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    AdminComponent,
    TopBarComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    SidebarModule,
    PanelMenuModule,
    ProgressBarModule,
    AdminRoutingModule,
    SplitButtonModule,
    MenubarModule
  ]
})
export class AdminModule { }
