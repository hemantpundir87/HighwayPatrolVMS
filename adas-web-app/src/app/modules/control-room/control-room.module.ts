import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ControlRoomRoutingModule } from './control-room-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';

// 🔹 Angular Material modules needed for dialog, form, toggle, icons, etc.
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ControlRoomMasterComponent } from './components/control-room-master/control-room-master.component';
import { ControlRoomSetupComponent } from './components/control-room-setup/control-room-setup.component';

@NgModule({
  declarations: [
    ControlRoomMasterComponent,
    ControlRoomSetupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ControlRoomRoutingModule,
    AgGridModule,

    // ✅ Material modules
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class ControlRoomModule {}
