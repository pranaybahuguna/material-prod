import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { JwtService } from "../../../core/services/jwt.service";
import { Router } from "../../../../../node_modules/@angular/router";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  @Output()
  toggleSidenav = new EventEmitter<void>();
  constructor(private jwtService: JwtService, private router: Router) {}

  logout() {
    this.jwtService.destroyToken();
    this.router.navigate(["/login"]);
  }

  ngOnInit() {}
}
