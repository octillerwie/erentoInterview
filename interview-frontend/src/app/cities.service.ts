import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CitiesService {
  host = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getCities() {
    return this.http.get(`${this.host}/cities`).pipe(map((res) => res));
  }
}