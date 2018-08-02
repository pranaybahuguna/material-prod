import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { InvoiceService } from "../../services/invoice.service";
import { Invoice } from "../../models/invoice";
import { Router } from "@angular/router";
import { MatSnackBar, MatPaginator, MatSort } from "@angular/material";
import { remove } from "lodash";
import "rxjs/Rx";

@Component({
  selector: "app-invoice-listing",
  templateUrl: "./invoice-listing.component.html",
  styleUrls: ["./invoice-listing.component.scss"]
})
export class InvoiceListingComponent implements OnInit, AfterViewInit {
  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  displayedColumns = ["item", "date", "due", "qty", "rate", "tax", "action"];
  dataSource: Invoice[] = [];
  resultsLength = 0;
  resultsLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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

  ngAfterViewInit() {
    this.paginator.page.subscribe(
      data => {
        this.resultsLoading = true;
        this.invoiceService
          .getInvoices({
            page: data.pageIndex,
            perPage: data.pageSize,
            sortField: this.sort.active,
            sortDir: this.sort.direction
          })
          .subscribe(
            data => {
              console.log(data);
              this.dataSource = data.docs;
              this.resultsLength = data.total;
              this.resultsLoading = false;
            },
            err => {
              this.errorHandler(err, "Failed to Fetch Invoices");
            }
          );
      },
      err => {
        this.errorHandler(err, "Failed to Fetch Invoices");
      }
    );
    this.sort.sortChange.subscribe(
      data => {
        console.log(data);
      },
      err => {}
    );

    this.populateInvoices();
  }

  errorHandler(error, message) {
    this.resultsLoading = false;
    console.log(error);
    this.snackBar.open(message, "Error", {
      duration: 3000
    });
  }

  ngOnInit() {}

  private populateInvoices() {
    this.resultsLoading = true;
    this.invoiceService
      .getInvoices({
        page: 0,
        perPage: 10,
        sortField: this.sort.active,
        sortDir: this.sort.direction
      })
      .subscribe(
        data => {
          this.dataSource = data.docs;
          this.resultsLength = data.total;
          this.resultsLoading = false;
          console.log(data);
        },
        err => {
          this.errorHandler(err, "Failed to Fetch Invoices");
        }
      );
  }
}
