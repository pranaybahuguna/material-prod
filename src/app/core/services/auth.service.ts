import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User, LoginResp, SignupResp } from "../models/user";
import { Observable } from "rxjs/Observable";
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(body: User): Observable<LoginResp> {
    return this.httpClient.post<LoginResp>(
      `${environment.api_url}/user/login`,
      body
    );
  }

  signup(body: User): Observable<SignupResp> {
    return this.httpClient.post<SignupResp>(
      `${environment.api_url}/user/signup`,
      body
    );
  }
}
