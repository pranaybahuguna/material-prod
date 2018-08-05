import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { InvoiceListingComponent } from "../invoices/components/invoice-listing/invoice-listing.component";
import { ClientListingComponent } from "../clients/components/client-listing/client-listing.component";
import { InvoiceFormComponent } from "../invoices/components/invoice-form/invoice-form.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "invoices",
        component: InvoiceListingComponent
      },
      {
        path: "clients",
        component: ClientListingComponent
      },  
      {
        path: "invoices/:id",
        component: InvoiceFormComponent
      },
      {
        path: "invoices/:id",
        component: InvoiceFormComponent
      },
      {
        path: "**",
        component: InvoiceListingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
