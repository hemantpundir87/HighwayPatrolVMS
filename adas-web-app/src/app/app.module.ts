import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoaderComponent } from './shared/components/loader/loader.component';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastComponent } from './shared/components/toast/toast.component';
import { LayoutModule } from './layouts/layout.module';
import { HttpUnifiedInterceptor } from './core/interceptors/http-unified.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    ToastComponent
   
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,        // HttpClient + AuthInterceptor (singleton)
    SharedModule,      // common shared components/pipes/directives
    AppRoutingModule,   // routing tree (lazy modules)
    LayoutModule   
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  //   { provide: HTTP_INTERCEPTORS, useClass: HttpAlertInterceptor, multi: true }
    
  // ],
 providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpUnifiedInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
