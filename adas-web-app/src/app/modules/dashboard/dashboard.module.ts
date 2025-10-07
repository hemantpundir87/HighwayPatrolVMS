import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';  // ✅ Add this

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule  // ✅ Required for <mat-card>, <mat-card-title>, etc.
  ]
})
export class DashboardModule { }
