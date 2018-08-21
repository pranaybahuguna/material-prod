import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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

  googleAuth(): Observable<LoginResp> {
    return this.httpClient.get<LoginResp>(`${environment.api_url}/auth/google`);
  }

  githubAuth(): Observable<LoginResp> {
    return this.httpClient.get<LoginResp>(`${environment.api_url}/auth/github`);
  }

  isAuthenticated(token): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      })
    };
    return this.httpClient.get<boolean>(
      `${environment.api_url}/auth/authenticate`,
      httpOptions
    );
  }
}
