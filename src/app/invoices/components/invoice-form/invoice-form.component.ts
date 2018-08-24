import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { InvoiceService } from "../../services/invoice.service";
import { MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { Invoice } from "../../models/invoice";
import { ClientService } from "../../../clients/services/client.service";
import { Client } from "../../../clients/models/client";

@Component({
  selector: "app-invoice-form",
  templateUrl: "./invoice-form.component.html",
  styleUrls: ["./invoice-form.component.scss"]
})
export class InvoiceFormComponent implements OnInit {
  private invoiceForm: FormGroup;
  private invoice: Invoice;
  title = "";
  clients: Client[] = [];
  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();
    this.setInvoiceToForm();
    this.setClients();
  }

  private setInvoiceToForm() {
    this.route.params.subscribe(params => {
      let id = params["id"];
      if (!id || id == "new") {
        return;
      }
      this.invoiceService.getInvoice(id).subscribe(
        invoice => {
          this.invoice = invoice;
          this.title = "Edit Invoice";
          if (this.invoice.client) {
            this.invoiceForm.patchValue({ client: this.invoice.client._id });
          }
          this.invoiceForm.patchValue({
            item: this.invoice.item,
            qty: this.invoice.qty,
            date: this.invoice.date,
            due: this.invoice.due,
            rate: this.invoice.rate,
            tax: this.invoice.tax
          });
        },
        err => {
          this.errorHandler(err, "Failed to set invoice");
        }
      );
    });
  }

  private createForm() {
    this.title = "New Invoice";
    this.invoiceForm = this.fb.group({
      item: ["", Validators.required],
      date: ["", Validators.required],
      due: ["", Validators.required],
      qty: ["", Validators.required],
      rate: "",
      tax: "",
      client: ["", Validators.required]
    });
  }

  private setClients() {
    this.clientService.getClients().subscribe(
      data => {
        this.clients = data;
      },
      err => {
        this.errorHandler(err, "Failed to fetch clients for select");
      }
    );
  }

  onSubmit() {
    if (this.invoice) {
      this.invoiceService
        .updateInvoice(this.invoice._id, this.invoiceForm.value)
        .subscribe(
          data => {
            this.snackBar.open("Invoice Updated", "Success", {
              duration: 2000
            });
            this.invoiceForm.reset();
            this.router.navigate(["dashboard", "invoices"]);
          },
          err => {
            this.errorHandler(err, "Failed to update invoice");
          }
        );
    } else {
      console.log(this.invoiceForm.value);
      this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(
        data => {
          this.snackBar.open("Invoice Created", "Success", {
            duration: 2000
          });
          this.invoiceForm.reset();
          this.router.navigate(["dashboard", "invoices"]);
        },
        err => {
          this.errorHandler(err, "Failed to create invoice");
        }
      );
    }
  }
  errorHandler(error, message) {
    console.log(error);
    this.snackBar.open(message, "Error", {
      duration: 3000
    });
  }

  cancelBtnHandler() {
    this.router.navigate(["dashboard", "invoices"]);
  }
}
