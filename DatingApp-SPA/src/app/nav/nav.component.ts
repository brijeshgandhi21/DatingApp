import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public authSetvice: AuthService,
    private alertify: AlertifyService,
    private router: Router) {}

  ngOnInit() {
    this.authSetvice.photoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authSetvice.login(this.model).subscribe(next => {
      this.alertify.success('Logged in Successfully.');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authSetvice.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authSetvice.decodedToken = null;
    this.authSetvice.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/']);
  }
}
