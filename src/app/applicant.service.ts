import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class Applicant {
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  sex: string = '';
  mobileNumber: string = '';
  municipality: string = '';
  username: string = '';
  password: string = '';

  constructor() { }
}

export class ApplicantService {
  constructor() {}
  }

export interface ApplicantData {
  firstName: string;
  middleName: string;
  lastName: string;
  sex: number;
  mobileNumber: number;
  municipality: string;
  username: string;
  password: string;
}