import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-to-landing',
  templateUrl: './redirect-to-landing.component.html',
  styleUrls: ['./redirect-to-landing.component.scss'],
})

export class RedirectToLandingComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/landing']);
  }
}
