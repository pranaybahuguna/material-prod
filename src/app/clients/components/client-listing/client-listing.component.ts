import { Component, OnInit, Inject } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/client";
import { MatDialog } from "@angular/material";
import { FormDialogComponent } from "../form-dialog/form-dialog.component";

@Component({
  selector: "app-client-listing",
  templateUrl: "./client-listing.component.html",
  styleUrls: ["./client-listing.component.scss"]
})
export class ClientListingComponent implements OnInit {
  displayedColumns = ["firstName", "lastName", "email"];
  dataSource: Client[] = [];
  constructor(private clientService: ClientService, public dialog: MatDialog) {}

  ngOnInit() {
    this.clientService.getClients().subscribe(
      data => {
        this.dataSource = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  animal: string;
  name: string;

  openFormDialog(): void {
    let dialogRef = this.dialog.open(FormDialogComponent, {
      width: "400px",
      height: "350px",
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.animal = result;
    });
  }
}
