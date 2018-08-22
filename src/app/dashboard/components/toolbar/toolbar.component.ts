import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { JwtService } from "../../../core/services/jwt.service";
import { Router } from "../../../../../node_modules/@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  @Output()
  toggleSidenav = new EventEmitter<void>();
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logOut().subscribe(
      data => {
        console.log(data);
      },
      err => {
        this.errorHandler(err, "Something went wrong");
      },
      () => {
        this.jwtService.destroyToken();
        this.router.navigate(["/login"]);
      }
    );
  }

  errorHandler(error, message) {
    console.log(error);
    this.snackBar.open(message, "Error", {
      duration: 3000
    });
  }

  ngOnInit() {}
}
