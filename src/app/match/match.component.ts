import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { ActivatedRoute } from '@angular/router';
import { Statistics } from '../_models/statistics.model';
import { Match } from '../_models/match.model';
import { Player } from '../_models/player.model';


@Component({
	selector: 'match',
	templateUrl: './match.template.html',
	styleUrls: ['./match.style.scss']
})

export class MatchComponent {

	match: Match;
	statistics: Statistics[];
	redTeam: Player[] = [];
	blueTeam: Player[] = [];

	constructor(private tagApiService: TagApiService, private route: ActivatedRoute) {
		console.log('MatchComponent');

		this.route.data.subscribe(val => {
			this.match = val.match as Match;
			this.statistics = val.statistics as Statistics[];

			console.log(this.statistics)

			this.blueTeam.push(this.match.b1);
			this.blueTeam.push(this.match.b2);
			this.blueTeam.push(this.match.b3);
			this.blueTeam.push(this.match.b4);
			this.blueTeam.push(this.match.b5);
			this.blueTeam.push(this.match.b6);

			this.redTeam.push(this.match.r1);
			this.redTeam.push(this.match.r2);
			this.redTeam.push(this.match.r3);
			this.redTeam.push(this.match.r4);
			this.redTeam.push(this.match.r5);
			this.redTeam.push(this.match.r6);

		});

		this.route.params.subscribe(params => {
			this.tagApiService.getMatch(params['id']).subscribe(mRes => {
				// Request all players...
				// Merci Cov
			

				// Save the match general stats
				this.match = mRes;

				// ... Then get detailed stats for each players of the match
				this.tagApiService.getMatchStats(params['id']).subscribe((sRes: Statistics[]) => {
					this.statistics = sRes;
					this.statistics.forEach(playerStats => {
						let player = this.redTeam.concat(this.blueTeam).find(player => { return player['id'] === playerStats['id']; });
						player.statistics = playerStats;
					})

					// Sort players on their score
					this.redTeam.sort(player => { return player.statistics ? player.statistics.score : 0; });
					this.blueTeam.sort(player => { return player.statistics ? player.statistics.score : 0; });
				})

			})


		});
	}


}
