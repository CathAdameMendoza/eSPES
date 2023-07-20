import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.scss'],
})
export class AdminInterfaceComponent  implements OnInit {
  consumers: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.http.get<any[]>('ionic/fetch.php').subscribe((response) => {
      this.consumers = response;
    });
  }
}
