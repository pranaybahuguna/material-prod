import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path : '',
        component : AppComponent
    },
    {
        path : 'app-dashboard',
        loadChildren : 'app/dashboard/dashboard.module#DashboardModule'
    },
    {
        path : '**',
        redirectTo : 'app-dashboard'
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
