import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlRoomMasterComponent } from './components/control-room-master/control-room-master.component';

const routes: Routes = [
  { path: '', component: ControlRoomMasterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoomRoutingModule {}
