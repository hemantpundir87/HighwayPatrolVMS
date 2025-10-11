import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageMasterComponent } from './components/package-master/package-master.component';


const routes: Routes = [
  { path: '', component: PackageMasterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule {}
