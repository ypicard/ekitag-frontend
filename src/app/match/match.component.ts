import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { ActivatedRoute } from "@angular/router";


@Component({
	selector: 'match',
	templateUrl: './match.template.html',
	styleUrls: ['./match.style.scss']
})

export class MatchComponent {

	match: any;

	constructor(private tagApiService: TagApiService, private route: ActivatedRoute) {
		console.log('MatchComponent')

		this.route.params.subscribe(params => {
			this.tagApiService.getMatch(params['id']).subscribe(res => {
				this.match = res;
				console.log(res)
			})
		});
	}


}
