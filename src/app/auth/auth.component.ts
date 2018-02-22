import {
  Component
} from '@angular/core';
import {
  FormsModule
} from '@angular/forms';
import {
  TagApiService
} from '../services/tag-api.service';
import {
  CookieService
} from 'ng2-cookies';
import {
  AuthService
} from '../services/auth.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.template.html',
  styleUrls: ['./auth.style.scss']
})

export class AuthComponent {

  loggedIn: Boolean = false;

  constructor(private tagApiService: TagApiService, public cookieService: CookieService, private authService: AuthService) {
    this.updateLoggedIn();
  }

  login(form) {
    this.authService.login(form.value.pseudo, form.value.password).subscribe(res => {
      this.cookieService.set('Bearer', res['Bearer']);
      this.updateLoggedIn();
    }, err => {
      alert('UNAUTHORIZED')
    })
  }

  logout() {
    this.authService.logout()
    this.updateLoggedIn();
  }

  updateLoggedIn() {
    this.loggedIn = this.authService.isLoggedIn();
  }
}
