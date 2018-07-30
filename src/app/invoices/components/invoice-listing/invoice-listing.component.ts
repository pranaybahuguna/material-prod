import { Component, OnInit } from "@angular/core";
import { InvoiceService } from "../../services/invoice.service";
import { Invoice } from "../../models/invoice";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { remove } from "lodash";

@Component({
  selector: "app-invoice-listing",
  templateUrl: "./invoice-listing.component.html",
  styleUrls: ["./invoice-listing.component.scss"]
})
export class InvoiceListingComponent implements OnInit {
  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  displayedColumns = ["item", "date", "due", "qty", "rate", "tax", "action"];
  dataSource: Invoice[] = [];

  newInvoiceHandler() {
    this.router.navigate(["dashboard", "invoices", "new"]);
  }

  deleteBtnHandler(id) {
    this.invoiceService.deleteInvoice(id).subscribe(
      data => {
        remove(this.dataSource, item => {
          return item._id === data._id;
        });
        this.dataSource = [...this.dataSource];
        this.snackBar.open("Invoice Deleted", "Success", {
          duration: 2000
        });
      },
      err => {
        this.errorHandler(err, "Failed to delete invoice");
      }
    );
  }

  editBtnHandler(id) {
    this.router.navigate(["dashboard", "invoices", id]);
  }

  errorHandler(error, message) {
    console.log(error);
    this.snackBar.open(message, "Error", {
      duration: 3000
    });
  }

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe(
      data => {
        this.dataSource = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
}
