import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    
  ],
  exports: [
    AdminLayoutComponent
  ]
})
export class LayoutModule {}
