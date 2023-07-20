import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminInterfacePage } from './admin-interface.page';

const routes: Routes = [
  {
    path: '',
    component: AdminInterfacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminInterfacePageRoutingModule {}
