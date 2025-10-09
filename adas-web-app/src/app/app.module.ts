import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAlertInterceptor } from './core/interceptors/http-alert.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ToastComponent } from './shared/components/toast/toast.component';
import { LayoutModule } from './layouts/layout.module';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    ToastComponent
   
  ],
  imports: [
    BrowserModule,
    CoreModule,        // HttpClient + AuthInterceptor (singleton)
    SharedModule,      // common shared components/pipes/directives
    AppRoutingModule,   // routing tree (lazy modules)
    LayoutModule   
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAlertInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
