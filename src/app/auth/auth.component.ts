import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../core/services/auth.service";
import { JwtService } from "../core/services/jwt.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { User } from "../core/models/user";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  title = "";
  resultsLoading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.jwtService.getToken()) {
      this.router.navigate(["/dashboard"]);
    }
    this.initForm();
    this.title = this.router.url === "/login" ? "Login" : "Signup";
  }

  private initForm() {
    this.authForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      name: ""
    });
  }

  googleAuthHandler() {
    this.authService.googleAuth().subscribe(
      data => {
        debugger;
        console.log(data);
      },
      err => {
        debugger;
        this.errorHandler(err, err.error);
      }
    );
  }

  errorHandler(error, message) {
    this.changeSpinnerState(false);
    console.log(error);
    this.snackBar.open(message, "Error", {
      duration: 3000
    });
  }
  changeSpinnerState(isEnabled: boolean) {
    this.resultsLoading = isEnabled;
    this.cdRef.detectChanges();
  }
  forgotPassHandler() {
    this.router.navigate(["/forgot-password"]);
  }
  onSubmit() {
    this.changeSpinnerState(true);
    if (this.title === "Signup") {
      this.authService.signup(this.authForm.value).subscribe(
        data => {
          this.snackBar.open(data.message, "Success", {
            duration: 3000
          });
          this.router.navigate(["/login"]);
          this.changeSpinnerState(false);
          console.log(data);
        },
        err => {
          this.errorHandler(err, err.message);
        }
      );
    } else {
      let { email, password } = this.authForm.value;
      let user: User = { email, password };
      this.authService.login(user).subscribe(
        data => {
          this.jwtService.setToken(data.token);
          this.snackBar.open("Login Successful", "Success", {
            duration: 3000
          });
          this.router.navigate(["/dashboard", "invoices"]);
          this.changeSpinnerState(false);
          console.log(data);
        },
        err => {
          this.errorHandler(err, "Oops Wrong Credentials");
        }
      );
    }
  }
}
