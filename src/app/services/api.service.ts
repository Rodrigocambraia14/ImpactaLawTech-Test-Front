import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public apiURL: string;
  constructor(public httpClient: HttpClient) {
    this.apiURL = environment.apiUrl;
  }
}
