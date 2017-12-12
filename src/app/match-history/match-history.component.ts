import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';

@Component({
	selector: 'match-history',
	templateUrl: './match-history.template.html',
	styleUrls: ['./match-history.style.scss']
})

export class MatchHistoryComponent {

	recentMatches:any;

	constructor(private tagApiService: TagApiService) {
		console.log('MatchHistoryComponent')
		this.getRecentMatches()
	}

	getRecentMatches(){
		this.tagApiService.getRecentMatches().subscribe(res => {
			this.recentMatches = res
		})
	}

}
