import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/client";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.scss"]
})
export class FormDialogComponent implements OnInit {
  clientForm: FormGroup;
  private client: Client;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initClientForm();
    console.log(this.data);
    if (this.data && this.data.clientId) {
      this.setClientToForm(this.data.clientId);
    }
  }

  setClientToForm(clientId: any): any {
    this.clientService.getClient(clientId).subscribe(
      client => {
        this.client = client;
        this.clientForm.patchValue(this.client);
      },
      err => {
        this.errorHandler(err, "Failed to populate client");
      }
    );
  }

  errorHandler(error, message) {
    console.log(error);
    this.snackBar.open(message, "Error", {
      duration: 2000
    });
  }

  private initClientForm() {
    this.clientForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required]
    });
  }
}
