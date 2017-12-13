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
	matchStats: any;
	redTeam: any = [];
	blueTeam: any = [];

	constructor(private tagApiService: TagApiService, private route: ActivatedRoute) {
		console.log('MatchComponent')

		this.route.params.subscribe(params => {
			this.tagApiService.getMatch(params['id']).subscribe(res => {
				// Request all players...
				// Merci Cov
				this.blueTeam.push(res['b1'])
				this.blueTeam.push(res['b2'])
				this.blueTeam.push(res['b3'])
				this.blueTeam.push(res['b4'])
				this.blueTeam.push(res['b5'])
				this.blueTeam.push(res['b6'])
				this.redTeam.push(res['r1'])
				this.redTeam.push(res['r2'])
				this.redTeam.push(res['r3'])
				this.redTeam.push(res['r4'])
				this.redTeam.push(res['r5'])
				this.redTeam.push(res['r6'])

				// Save the match general stats
				this.match = res;

				// ... Then get detailed stats for each players of the match
				this.tagApiService.getMatchStats(params['id']).subscribe(res => {
					this.matchStats = res;
					this.matchStats.forEach(playerStats => {
						let player = this.redTeam.concat(this.blueTeam).find(player => { return player['id'] == playerStats['id'] })
						player['stats'] = playerStats
					})

					// Sort players on their score
					this.redTeam.sort(player => { return player.stats ? player.stats.score : 0 })
					this.blueTeam.sort(player => { return player.stats ? player.stats.score : 0 })
				})


			})


		});
	}


}
