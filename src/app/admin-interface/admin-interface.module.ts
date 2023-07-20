import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { AdminInterfacePageRoutingModule } from './admin-interface-routing.module';

import { AdminInterfacePage } from './admin-interface.page';
import { AppComponent } from '../app.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminInterfacePageRoutingModule,
    HttpClientModule
  ],
  declarations: [AdminInterfacePage],
  bootstrap: [AppComponent]
})
export class AdminInterfacePageModule {}
export class AppModule {}
