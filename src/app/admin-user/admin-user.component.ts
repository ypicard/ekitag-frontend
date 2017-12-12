import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: 'admin-user',
	templateUrl: './admin-user.template.html',
	styleUrls: ['./admin-user.style.scss']
})

export class AdminUserComponent {

	user: any;
	newPseudo: String = '';

	constructor(private tagApiService: TagApiService, private route: ActivatedRoute) {
		console.log('AdminComponent')
		this.route.params.subscribe(params => {
			this.tagApiService.getUser(params['id']).subscribe(resUser => {
				this.user = resUser;
			})
		});
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
		this.tagApiService.getUser(this.user.id).subscribe(resUser => {
			this.user = resUser;
		})
	}


}
