import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlRoomRoutingModule } from './control-room-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ControlRoomMasterComponent } from './components/control-room-master/control-room-master.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [ControlRoomMasterComponent],
  imports: [CommonModule, SharedModule, ControlRoomRoutingModule,AgGridModule]
})
export class ControlRoomModule {}
