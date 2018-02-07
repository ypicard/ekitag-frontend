import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: 'player',
	templateUrl: './player.template.html',
	styleUrls: ['./player.style.scss']
})

export class PlayerComponent {

	player: any;
	newPseudo: String = '';

	constructor(private tagApiService: TagApiService, private route: ActivatedRoute) {
		console.log('PlayerComponent')
		this.route.params.subscribe(params => {
			this.tagApiService.getUser(params['id']).subscribe(resUser => {
				this.player = resUser;
			})
		});
	}

	refreshUser() {
		this.tagApiService.getUser(this.player.id).subscribe(resUser => {
			this.player = resUser;
		})
	}

	addPseudo(newPseudo) {
		console.log(this.player.usual_pseudos)
		this.tagApiService.addPseudo(this.player, newPseudo).subscribe(res => {
			alert(res['message'])
			this.refreshUI();
		})
	}

	deactivateUser() {
		this.tagApiService.deactivateUser(this.player.id).subscribe(res => {
			alert(res['message'])
			this.refreshUI();
		})
	}

	refreshUI() {
		this.tagApiService.downgradeAdmin(this.player.id).subscribe(res => {
			alert('Downgraded')
			this.refreshUser();
		})
	}

	promoteAdmin(form) {
		if (form.value.password.length < 3) {
			alert('Choose a longer password')
			return
		}
		this.tagApiService.promoteAdmin(this.player.id, form.value.password).subscribe(res => {
			alert('Success')
			this.refreshUser();
		})
	}

	downgradeAdmin(){
		this.tagApiService.downgradeAdmin(this.player.id).subscribe(res => {
			console.log(res)
		})
	}


}
