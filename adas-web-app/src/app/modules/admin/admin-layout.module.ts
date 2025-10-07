import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { SidebarComponent } from '../../layouts/admin-layout/sidebar/sidebar.component';
import { TopbarComponent } from '../../layouts/admin-layout/topbar/topbar.component';
import { FooterComponent } from '../../layouts/admin-layout/footer/footer.component';

// Import your components


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
    HttpClientModule
  ],
  exports: [AdminLayoutComponent]
})
export class AdminLayoutModule {}
