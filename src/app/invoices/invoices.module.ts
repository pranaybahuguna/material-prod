import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InvoiceListingComponent } from "./components/invoice-listing/invoice-listing.component";
import { MaterialModule } from "../shared/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { InvoiceService } from "./services/invoice.service";
import { InvoiceFormComponent } from "./components/invoice-form/invoice-form.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [InvoiceListingComponent, InvoiceFormComponent],
  exports: [InvoiceListingComponent],
  providers: [InvoiceService]
})
export class InvoicesModule {}
