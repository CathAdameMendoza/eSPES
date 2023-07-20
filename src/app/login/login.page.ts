import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
interface Credential {
  accountNumber: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  accountNumber: string = '';
  password: string = '';
  errorMessage: string = '';
  credentials: Credential[] = [];

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<{ credentials: Credential[] }>('assets/data/credentials.json').subscribe(
      (data) => {
        this.credentials = data.credentials;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  submitLogin(loginForm: any) {
    const formData = new FormData();

    formData.append('accountNumber', this.accountNumber);
    formData.append('password', this.password);
    
    this.http.post('http://localhost/ionic/login.php', formData)
    .subscribe((response: any) => {
      if (response.status === 'success') {
        setTimeout(() => {
        this.router.navigate(['/consumer-interface']);
      }, 300);
    }
        this.http.post('http://localhost/ionic/login-admin.php', formData)
        .subscribe((response: any) => {
          if (response.status === 'success') {
            setTimeout(() => {
            this.router.navigate(['/superadmin-interface']);
          }, 300);
        }
    });
        this.http.post('http://localhost/ionic/login-cashier.php', formData)
        .subscribe((response: any) => {
          if (response.status === 'success') {
            setTimeout(() => {
            this.router.navigate(['/cashier']);
          }, 300);
        }
    });
        this.http.post('http://localhost/ionic/login-cservice.php', formData)
        .subscribe((response: any) => {
          if (response.status === 'success') {
            setTimeout(() => {
            this.router.navigate(['/customer-service']);
          }, 300);
        }
      });
    })
  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Login',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}