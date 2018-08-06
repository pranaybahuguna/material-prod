import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/client";
import { MatDialog, MatSnackBar, MatTableDataSource } from "@angular/material";
import { FormDialogComponent } from "../form-dialog/form-dialog.component";
import "rxjs/add/operator/mergeMap";
import { errorHandler } from "@angular/platform-browser/src/browser";

@Component({
  selector: "app-client-listing",
  templateUrl: "./client-listing.component.html",
  styleUrls: ["./client-listing.component.scss"]
})
export class ClientListingComponent implements OnInit {
  displayedColumns = ["firstName", "lastName", "email", "action"];
  dataSource = new MatTableDataSource<Client>();
  resultsLoading = false;
  constructor(
    private clientService: ClientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.changeSpinnerState(true);
    this.clientService.getClients().subscribe(
      data => {
        this.dataSource.data = data;
        this.changeSpinnerState(false);
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  errorHandler(error, message) {
    console.log(error);
    this.snackBar.open(message, "Error", {
      duration: 3000
    });
  }

  changeSpinnerState(isEnabled: boolean) {
    this.resultsLoading = isEnabled;
    this.cdRef.detectChanges();
  }

  deleteBtnHandler() {}

  openFormDialog(clientId: string): void {
    let options = {
      width: "400px",
      height: "350px",
      data: {}
    };
    if (clientId) {
      options.data = { clientId: clientId };
    }
    let dialogRef = this.dialog.open(FormDialogComponent, options);

    dialogRef.afterClosed().subscribe(client => {
      if (client.id)
        if (client != undefined) {
          this.clientService.createClient(client).subscribe(
            data => {
              this.dataSource.data.push(data);
              this.dataSource.data = [...this.dataSource.data];
              this.snackBar.open("Client Created", "Success", {
                duration: 2000
              });
            },
            err => {
              this.errorHandler(err, "Failed to create client");
            }
          );
        }
      console.log(`Client is ${client}`);
    });
  }
}
