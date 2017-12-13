import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: 'player',
	templateUrl: './player.template.html',
	styleUrls: ['./player.style.scss']
})

export class PlayerComponent {

	user: any;
	newPseudo: String = '';

	constructor(private tagApiService: TagApiService, private route: ActivatedRoute) {
		console.log('PlayerComponent')
		this.route.params.subscribe(params => {
			this.tagApiService.getUser(params['id']).subscribe(resUser => {
				this.user = resUser;
			})
		});
	}

	refreshUser() {
		this.tagApiService.getUser(this.user.id).subscribe(resUser => {
			this.user = resUser;
		})
	}

	addPseudo(newPseudo) {
		console.log(this.user.usual_pseudos)
		// if (this.user.usual_pseudos.indexOf(newPseudo) < 0) {
		// 	alert('Pseudo already in use.')
		// 	return;
		// }
		this.tagApiService.addPseudo(this.user, newPseudo).subscribe(res => {
			alert(res['message'])
			this.refreshUI();
		})
	}

	deactivateUser() {
		this.tagApiService.deactivateUser(this.user.id).subscribe(res => {
			alert(res['message'])
			this.refreshUI();
		})
	}

	refreshUI() {
		this.tagApiService.downgradeAdmin(this.user.id).subscribe(res => {
			alert('Downgraded')
			this.refreshUser();
		})
	}

	promoteAdmin(form) {
		if (form.value.password.length < 3) {
			alert('Choose a longer password')
			return
		}
		this.tagApiService.promoteAdmin(this.user.id, form.value.password).subscribe(res => {
			alert('Success')
			this.refreshUser();
		})
	}

	downgradeAdmin(){
		this.tagApiService.downgradeAdmin(this.user.id).subscribe(res => {
			console.log(res)
		})
	}


}
