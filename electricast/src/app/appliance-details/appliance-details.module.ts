import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ApplianceDetailsPage } from './appliance-details.page';

const routes: Routes = [
  {
    path: '',
    component: ApplianceDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ApplianceDetailsPage]
})
export class ApplianceDetailsPageModule {}
