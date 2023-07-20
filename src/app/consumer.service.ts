import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class Consumer {
  ConsumerID: number = 0 ;
  firstName: string = '';
  lastName: string = '';
  accountNumber: string = '';
  areaNumber: string = '';
  municipality: string = '';
  username: string = '';
  password: string = '';

  constructor() { }
}

export class ConsumerService {
  constructor() {}
  }

export interface ConsumerData {
  ConsumerID: number;
  firstName: string;
  lastName: string;
  accountNumber: number;
  areaNumber: number;
  municipality: string;
  username: string;
  password: string;
}