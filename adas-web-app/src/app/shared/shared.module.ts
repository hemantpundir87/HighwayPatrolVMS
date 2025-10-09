import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // ✅ IMPORTANT

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule  // ✅ enables routerLink, router-outlet, etc.
  ],
  exports: [PageNotFoundComponent]  // make it available to AppRoutingModule
})
export class SharedModule {}
