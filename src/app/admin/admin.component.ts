import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { FormsModule }   from '@angular/forms';

@Component({
	selector: 'admin',
	templateUrl: './admin.template.html',
	styleUrls: ['./admin.style.scss']
})

export class AdminComponent {

	users: any;
	pseudo: String;
	trigram: String;

	constructor(private tagApiService: TagApiService) {
		console.log('AdminComponent')
		this.refreshUI()
	}

	createUser(trigram, pseudo) {
		console.log('createUser()')
		if (!trigram || !pseudo) {
			alert('A player must have a trigram and a pseudo.')
			return;
		}

		trigram = trigram.toLowerCase(); // Only send downcase

		this.tagApiService.createUser(trigram, pseudo).subscribe(res => {
			alert(res['message'])
			this.refreshUI()
		}, error => {
			alert(error.error.message)
		})
	}

	refreshUI() {
		this.tagApiService.getAllUsers().subscribe(res => {
			this.users = res;
		})
	}

}
