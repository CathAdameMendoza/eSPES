import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Applicant as ImportedApplicant} from '../applicant.service';

interface Applicant {
  firstName: string;
  middleName: string;
  lastName: string;
  sex: string;
  mobileNumber: string;
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

export class AdminInterfacePage {
  firstName: string;
  middleName: string;
  lastName: string;
  sex: string;
  mobileNumber: string;
  municipality: string;
  username: string;
  password: string;
  applicant: Applicant[] = [];
  searchText: string = '';
  selectedApplicant: Applicant | null = null;

  formData: Applicant = {
    firstName: '',
    middleName: '',
    lastName: '',
    sex: '',
    mobileNumber: '',
    municipality: '',
    username: '',
    password: '',
  };

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) {
    this.firstName = '';
    this.middleName = '',
    this.lastName = '';
    this.sex = '';
    this.mobileNumber = '';
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
      this.applicant = data;
      console.log(this.applicant);
    },
    (error) => {
      console.error('Error fetching applicant data:', error);
    }
    );
  }

    // Fetch data in input fields 
  populateFields(applicant: Applicant) {
    this.selectedApplicant = applicant;
    this.firstName = applicant.firstName;
    this.middleName = applicant.middleName;
    this.lastName = applicant.lastName;
    this.sex = applicant.sex;
    this.mobileNumber = applicant.mobileNumber;
    this.municipality = applicant.municipality;
    this.username = applicant.username;
    this.password = applicant.password;
    }

    
  submitForm() {
    const data = {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      sex: this.sex,
      mobileNumber: this.mobileNumber,
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
    if (this.selectedApplicant !== null) {
        const formData: Applicant = {
          firstName: this.firstName,
          middleName: this.middleName,
          lastName: this.lastName,
          sex: this.sex,
          mobileNumber: this.mobileNumber,
          municipality: this.municipality,
          username: this.username,
          password: this.password
      };

      this.http.post('http://localhost/ionic/superadmin-update.php', formData)
      .subscribe(response => {
        console.log(response); // Handle success scenario
        // Reset selected customer and form fields
        this.selectedApplicant = null;
        this.clearForm();
        this.fetchConsumers(); // Update the customer list after the update
      });
    }
  }
  
deleteConsumer() {
  if (this.selectedApplicant !== null) {
    const ConsumerID = this.selectedApplicant.username;
    const url = `http://localhost/ionic/superadmin-delete.php?username=${this.username}`;

    this.http.delete(url).subscribe(
      (response: any) => {
        console.log(response); // Handle success scenario
        this.selectedApplicant = null; // Reset selected customer
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
    this.middleName = '';
    this.lastName = '';
    this.sex = '';
    this.mobileNumber = '';
    this.municipality = '';
    this.username = '';
    this.password = '';
  }
  
  // Search Function
  get filteredApplicant(): Applicant[] {
    return this.applicant.filter(applicant => {
      const fullName = applicant.firstName + ' ' + applicant.lastName;
      return fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      applicant.sex.toLowerCase().includes(this.searchText.toLowerCase()) ||
      applicant.mobileNumber.toLowerCase().includes(this.searchText.toLowerCase()) ||
      applicant.municipality.toLowerCase().includes(this.searchText.toLowerCase()) ||
      applicant.username.toLowerCase().includes(this.searchText.toLowerCase()) ||
      applicant.password.toLowerCase().includes(this.searchText.toLowerCase());
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