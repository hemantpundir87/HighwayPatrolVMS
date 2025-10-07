import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';            // ✅ Add this
import { AppRoutingModule } from './app-routing.module';   // ✅ Already there

import { AppComponent } from './app.component';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

// Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ToastrModule } from 'ngx-toastr';
import { AdminLayoutModule } from './modules/admin/admin-layout.module';
import { HttpAlertInterceptor } from './core/interceptors/http-alert.interceptor';
import { LoaderComponent } from './shared/loader/loader.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    LoaderComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,          // ✅ Required for <router-outlet>
    AppRoutingModule,      // ✅ Your route definitions
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatSnackBarModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true
    }),
    DashboardModule,
    AdminLayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAlertInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAlertInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
