import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'appliances-list',
        children: [
          {
            path: '',
            loadChildren: '../appliances-list/appliances-list.module#AppliancesListPageModule'
          }
        ]
      },
      {
        path: 'rate-settings',
        children: [
          {
            path: '',
            loadChildren: '../rate-settings/rate-settings.module#RateSettingsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/dashboard/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule {}
