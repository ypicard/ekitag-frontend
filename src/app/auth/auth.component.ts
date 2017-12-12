import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagApiService } from '../services/tag-api.service';
import { CookieService } from 'ng2-cookies';

@Component({
	selector: 'auth',
	templateUrl: './auth.template.html',
	styleUrls: ['./auth.style.scss']
})

export class AuthComponent {

	loggedIn: Boolean = false;

	constructor(private tagApiService: TagApiService, public cookieService: CookieService) {
		this.updateLoggedIn()
	}

	login(form) {
		this.tagApiService.login(form.value.pseudo, form.value.password).subscribe(res => {
			this.cookieService.set('Bearer', res['Bearer']);
			this.updateLoggedIn()
		}, err => {
			alert('UNAUTHORIZED')
		})
	}

	logout() {
		this.cookieService.delete('Bearer');
		this.updateLoggedIn();
	}

	updateLoggedIn() {
		this.loggedIn =  this.cookieService.check('Bearer')
	}
}
