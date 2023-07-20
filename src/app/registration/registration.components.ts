import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  isFormSubmitted = false;

  constructor(private registrationService: RegistrationService) { }

  submitForm(form: NgForm) {
    this.isFormSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.registrationService.registerUser(form.value)
      .subscribe(
        response => {
          // Handle success response
          console.log('Registration successful:', response);
        },
        error => {
          // Handle error response
          console.error('Registration failed:', error);
        }
      );
  }
}
