import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  accountNumber: string = '';
  email: string = '';
  contactNumber: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  submitRequest() {
    const formData = new FormData();
    formData.append('accountNumber', this.accountNumber);
    formData.append('email', this.email);
    formData.append('contactNumber', this.contactNumber);

    this.http.post('http://localhost/ionic/forgotpassword.php', formData)
      .subscribe(response => {
        console.log(response);
        // Handle response or perform any necessary actions
      });
      setTimeout(() => {
      this.router.navigate(['/landing']);
  }, 300);
}

  ngOnInit() {
  }

}
