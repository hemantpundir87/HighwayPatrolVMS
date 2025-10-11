import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../../shared/shared.module';
import { PackageRoutingModule } from './package-routing.module';

// 🔹 Angular Material modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';   // ✅ needed for ControlRoom & Status dropdown
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// 🔹 Components
import { PackageMasterComponent } from './components/package-master/package-master.component';
import { PackageSetupComponent } from './components/package-setup/package-setup.component';

@NgModule({
  declarations: [
    PackageMasterComponent,
    PackageSetupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PackageRoutingModule,
    AgGridModule,

    // ✅ Material modules
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,     // ✅ Added
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class PackageModule {}
