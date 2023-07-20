import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private apiUrl = 'assets/data/super-admin-data.json';

  constructor(private http: HttpClient) { }

  updateConsumerData(updatedData: any) {
    return this.http.put(this.apiUrl, updatedData);
  }
}

