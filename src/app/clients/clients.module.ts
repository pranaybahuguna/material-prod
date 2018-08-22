import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientListingComponent } from "./components/client-listing/client-listing.component";
import { MaterialModule } from "../shared/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClientService } from "./services/client.service";
import { FormDialogComponent } from "./components/form-dialog/form-dialog.component";

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [ClientListingComponent, FormDialogComponent],
  exports: [ClientListingComponent],
  providers: [ClientService],
  entryComponents: [FormDialogComponent]
})
export class ClientsModule {}
