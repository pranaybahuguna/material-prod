import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/client";
import { MatDialog, MatSnackBar, MatTableDataSource } from "@angular/material";
import { FormDialogComponent } from "../form-dialog/form-dialog.component";
import "rxjs/add/operator/mergeMap";
import { errorHandler } from "@angular/platform-browser/src/browser";
import { isUndefined } from "util";
import { remove } from "lodash";

@Component({
  selector: "app-client-listing",
  templateUrl: "./client-listing.component.html",
  styleUrls: ["./client-listing.component.scss"]
})
export class ClientListingComponent implements OnInit {
  displayedColumns = ["firstName", "lastName", "email", "action"];
  private dataSource = new MatTableDataSource<Client>();
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

  deleteBtnHandler(id: string) {
    this.clientService.deleteClient(id).subscribe(
      data => {
        remove(this.dataSource.data, item => {
          return item._id === data._id;
        });
        this.dataSource.data = [...this.dataSource.data];
        this.snackBar.open("Client Deleted", "Success", {
          duration: 2000
        });
      },
      err => {
        this.errorHandler(err, "Failed to delete client");
      }
    );
  }

  openFormDialog(clientId: string): void {
    const options = {
      width: "400px",
      height: "350px",
      data: {}
    };
    if (clientId) {
      options.data = { clientId: clientId };
    }
    let dialogRef = this.dialog.open(FormDialogComponent, options);
    dialogRef
      .afterClosed()
      .filter(clientParam => typeof clientParam === "object")
      .flatMap(result => {
        return clientId
          ? this.clientService.updateClient(clientId, result)
          : this.clientService.createClient(result);
      })
      .subscribe(
        client => {
          let successMsg = "";
          if (clientId) {
            const index = this.dataSource.data.findIndex(
              client => client._id === clientId
            );
            this.dataSource.data[index] = client;
            successMsg = "Client updated";
          } else {
            this.dataSource.data.push(client);
            successMsg = "Client created";
          }
          this.dataSource.data = [...this.dataSource.data];
          this.snackBar.open(successMsg, "Success", {
            duration: 2000
          });
        },
        err => this.errorHandler(err, "Failed to created Client")
      );
  }
}
