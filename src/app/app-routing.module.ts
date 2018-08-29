import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: "login",
    component: AuthComponent
  },
  {
    path: "signup",
    component: AuthComponent
  },
  {
    path: "dashboard",
    loadChildren: "app/dashboard/dashboard.module#DashboardModule"
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent
  },
  {
    path: "reset-password/:token",
    component: ResetPasswordComponent
  },
  {
    path: "**",
    redirectTo: "dashboard"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
