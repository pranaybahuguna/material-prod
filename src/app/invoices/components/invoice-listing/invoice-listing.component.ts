import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from "@angular/core";
import { InvoiceService } from "../../services/invoice.service";
import { Invoice } from "../../models/invoice";
import { Router } from "@angular/router";
import { MatSnackBar, MatPaginator, MatSort } from "@angular/material";
import { remove } from "lodash";
import "rxjs/Rx";
import { catchError } from "rxjs/operators/catchError";
import { map } from "rxjs/operators/map";
import { startWith } from "rxjs/operators";
import { switchMap } from "rxjs/operators";
import { merge } from "rxjs/operators";

@Component({
  selector: "app-invoice-listing",
  templateUrl: "./invoice-listing.component.html",
  styleUrls: ["./invoice-listing.component.scss"]
})
export class InvoiceListingComponent implements OnInit, AfterViewInit {
  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {}
  displayedColumns = ["item", "date", "due", "action"];
  dataSource: Invoice[] = [];
  resultsLength = 0;
  resultsLoading = false;
  private itemFilter = "";

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

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
    // This will run when the paginator is triggered
    this.paginator.page.subscribe(
      data => {
        this.changeSpinnerState(true);
        this.invoiceService
          .getInvoices({
            page: data.pageIndex,
            perPage: data.pageSize,
            sortField: this.sort.active,
            sortDir: this.sort.direction,
            filter: this.itemFilter
          })
          .subscribe(
            data => {
              console.log(data);
              this.dataSource = data.docs;
              this.resultsLength = data.total;
              this.changeSpinnerState(false);
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

    // This will run when the sort header is triggered
    this.sort.sortChange.subscribe(
      data => {
        this.changeSpinnerState(true);
        this.invoiceService
          .getInvoices({
            page: this.paginator.pageIndex,
            perPage: this.paginator.pageSize,
            sortField: data.active,
            sortDir: data.direction,
            filter: this.itemFilter
          })
          .subscribe(
            data => {
              console.log(data);
              this.dataSource = data.docs;
              this.resultsLength = data.total;
              this.changeSpinnerState(false);
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

    // This will run the very first timr page gets populated
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

  filterText(event: any) {
    this.changeSpinnerState(true);
    this.paginator.pageIndex = 0;
    this.itemFilter = event.target.value;
    this.invoiceService
      .getInvoices({
        page: this.paginator.pageIndex,
        perPage: this.paginator.pageSize,
        sortField: this.sort.active,
        sortDir: this.sort.direction,
        filter: this.itemFilter
      })
      .subscribe(
        data => {
          this.dataSource = data.docs;
          this.resultsLength = data.total;
          this.changeSpinnerState(false);
          console.log(data);
        },
        err => {
          this.errorHandler(err, "Failed to Fetch Invoices");
        }
      );
  }

  private populateInvoices() {
    this.changeSpinnerState(true);
    this.invoiceService
      .getInvoices({
        page: 0,
        perPage: 10,
        sortField: this.sort.active,
        sortDir: this.sort.direction,
        filter: this.itemFilter
      })
      .subscribe(
        data => {
          this.dataSource = data.docs;
          this.resultsLength = data.total;
          this.changeSpinnerState(false);
          console.log(data);
        },
        err => {
          this.errorHandler(err, "Failed to Fetch Invoices");
        }
      );
  }
  changeSpinnerState(isEnabled: boolean) {
    this.resultsLoading = isEnabled;
    this.cdRef.detectChanges();
  }
}
