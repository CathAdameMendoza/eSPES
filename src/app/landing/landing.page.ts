import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})

export class LandingPage implements OnInit {
  isMinimized = false;
  showHeaderContent = true;

  constructor(private router: Router) { }

  login() {
    this.router.navigate(['/protected-page']);
  }

  ngOnInit() {
  }

  @HostListener('window:resize', [])
    onWindowResize() {
      this.checkScreenSize();
    }

  private checkScreenSize() { // for showing the menu
    this.isMinimized = window.innerWidth <= 700;
    this.showHeaderContent = window.innerWidth > 700;
  }
}