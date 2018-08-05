import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import {Client} from '../models/client';

const BASE_URL = "http://localhost:3000/api";
@Injectable()
export class ClientService {

  constructor(private httpClient : HttpClient) { }

  getClients() : Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${BASE_URL}/clients`);
  }

}
