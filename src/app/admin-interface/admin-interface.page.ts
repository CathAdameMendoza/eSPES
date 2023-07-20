import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface Consumer {
  ConsumerID: string;
  firstName: string;
  lastName: string;
  accountNumber: string;
  areaNumber: string;
  municipality: string;
  username: string; 
  password: string;
}

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.page.html',
  template: ' <button (click)="confirmLogout()">Logout</button>',
  styleUrls: ['./admin-interface.page.scss'],
})

export class AdminInterfacePage implements OnInit {
  ConsumerID: number;
  firstName: string;
  lastName: string;
  accountNumber: string;
  areaNumber: string;
  municipality: string;
  username: string;
  password: string;
  consumers: Consumer[] = [];
  searchText: string = '';
  selectedConsumer: Consumer | null = null;

  formData: Consumer = {
    ConsumerID: '',
    firstName: '',
    lastName: '',
    accountNumber: '',
    areaNumber: '',
    municipality: '',
    username: '',
    password: '',
  };

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) {
    this.ConsumerID = 0;
    this.firstName = '';
    this.lastName = '';
    this.accountNumber = '';
    this.areaNumber = '';
    this.municipality = '';
    this.username = '';
    this.password = '';
  }

  ngOnInit() {
    this.fetchConsumers();
  }

  // Fetch Data from database
  fetchConsumers() {
    this.http.get<any>('http://localhost/ionic/fetch.php').subscribe(
      (data) => {
      this.consumers = data;
      console.log(this.consumers);
    },
    (error) => {
      console.error('Error fetching consumer data:', error);
    }
    );
  }

    // Fetch data in input fields 
  populateFields(consumer: Consumer) {
    this.selectedConsumer = consumer;
    this.firstName = consumer.firstName;
    this.lastName = consumer.lastName;
    this.accountNumber = consumer.accountNumber;
    this.areaNumber = consumer.areaNumber;
    this.municipality = consumer.municipality;
    this.username = consumer.username;
    this.password = consumer.password;
    }

    
  submitForm() {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      accountNumber: this.accountNumber,
      areaNumber: this.areaNumber,
      municipality: this.municipality,
      username: this.municipality,
      password: this.password
    };

    this.http.post('http://localhost/ionic/superadmin-add.php', data)
    .subscribe(response => {
      console.log(response);
      this.clearForm();
      this.fetchConsumers();
      // Handle response or perform any necessary actions
    });
    (error: any) => {
      console.error(error); // Log the error message
    }
}

  updateConsumer() {
    if (this.selectedConsumer !== null) {
        const formData: Consumer = {
          ConsumerID: this.selectedConsumer.ConsumerID,
          firstName: this.firstName,
          lastName: this.lastName,
          accountNumber: this.accountNumber,
          areaNumber: this.areaNumber,
          municipality: this.municipality,
          username: this.username,
          password: this.password
      };

      this.http.post('http://localhost/ionic/superadmin-update.php', formData)
      .subscribe(response => {
        console.log(response); // Handle success scenario
        // Reset selected customer and form fields
        this.selectedConsumer = null;
        this.clearForm();
        this.fetchConsumers(); // Update the customer list after the update
      });
    }
  }
  
deleteConsumer() {
  if (this.selectedConsumer !== null) {
    const ConsumerID = this.selectedConsumer.ConsumerID;
    const url = `http://localhost/ionic/superadmin-delete.php?ConsumerID=${ConsumerID}`;

    this.http.delete(url).subscribe(
      (response: any) => {
        console.log(response); // Handle success scenario
        this.selectedConsumer = null; // Reset selected customer
        this.clearForm();
        this.fetchConsumers(); // Update the customer list after the delete
      },
      (error: any) => {
        console.error(error); // Log the error message
      }
    );
  }
}

  // Password encryption
  maskPassword(password: string): string {
    return '*'.repeat(password.length);
  }

  // Clear Function
  clearForm() {
    this.firstName = '';
    this.lastName = '';
    this.accountNumber = '';
    this.areaNumber = '';
    this.municipality = '';
    this.username = '';
    this.password = '';
  }
  
  // Search Function
  get filteredConsumers(): Consumer[] {
    return this.consumers.filter(consumer => {
      const fullName = consumer.firstName + ' ' + consumer.lastName;
      return fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        consumer.accountNumber.toLowerCase().includes(this.searchText.toLowerCase()) ||
        consumer.areaNumber.toLowerCase().includes(this.searchText.toLowerCase()) ||
        consumer.municipality.toLowerCase().includes(this.searchText.toLowerCase()) ||
        consumer.username.toLowerCase().includes(this.searchText.toLowerCase()) ||
        consumer.password.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  /* Logout Function */

async confirmLogout() {
  const alert = await this.alertController.create({
    header: 'Logout',
    message: 'Are you sure you want to log out?',
    buttons: [
      {
        text: 'No',
        role: 'cancel'
      },
      {
        text: 'Yes',
        handler: () => {
          this.logout();
        }
      }
    ]
  });

  await alert.present();
}

  logout() {
    setTimeout(() => {
    this.router.navigate(['/landing']);
  }, 300);
}
}