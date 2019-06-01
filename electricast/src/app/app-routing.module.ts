import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'appliances-list', loadChildren: './appliances-list/appliances-list.module#AppliancesListPageModule' },
  { path: 'appliance-details/:id', loadChildren: './appliance-details/appliance-details.module#ApplianceDetailsPageModule' },
  { path: 'rate-settings', loadChildren: './rate-settings/rate-settings.module#RateSettingsPageModule' },  { path: 'add-appliance', loadChildren: './modals/add-appliance/add-appliance.module#AddAppliancePageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
