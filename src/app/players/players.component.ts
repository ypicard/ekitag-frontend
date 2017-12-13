import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { FormsModule }   from '@angular/forms';

@Component({
	selector: 'players',
	templateUrl: './players.template.html',
	styleUrls: ['./players.style.scss']
})

export class PlayersComponent {

	users: any;
	pseudo: String;
	trigram: String;

	constructor(private tagApiService: TagApiService) {
		console.log('PlayersComponent')
		this.refreshUI()
	}

	createUser(trigram, pseudo) {
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
