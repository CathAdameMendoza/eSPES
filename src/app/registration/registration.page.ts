import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {
  firstName: string = '';
  lastName: string = '';
  accountNumber: string = '';
  areaNumber: string = '';
  municipality: string = '';
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) {}

  submitForm() {
    if (this.isFormValid()) {
      const formData = new FormData();
      formData.append('firstName', this.firstName);
      formData.append('lastName', this.lastName);
      formData.append('accountNumber', this.accountNumber);
      formData.append('areaNumber', this.areaNumber);
      formData.append('municipality', this.municipality);
      formData.append('username', this.username);
      formData.append('password', this.password);

      this.http.post('http://localhost/ionic/registration.php', formData).subscribe(
        (response) => {
          console.log(response);
          // Handle response or perform any necessary actions
        },
        (error) => {
          console.error('Error submitting form:', error);
        }
      );

      setTimeout(() => {
        this.router.navigate(['/consumer-interface']);
      }, 300);
    } else {
      this.presentAlert();
    }
  }

  isFormValid(): boolean {
    // Check if any required field is empty
    return (
      !!this.firstName &&
      !!this.lastName &&
      !!this.accountNumber &&
      !!this.areaNumber &&
      !!this.municipality &&
      !!this.username &&
      !!this.password
    );
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Incomplete Form',
      message: 'Please fill in all fields.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
