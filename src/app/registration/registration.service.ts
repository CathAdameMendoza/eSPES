import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private backendUrl = 'http://your-backend-url.com'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  registerUser(formData: any) {
    return this.http.post(`${this.backendUrl}/register`, formData);
  }
}
