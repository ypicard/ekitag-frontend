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

    constructor(private tagApiService: TagApiService, private route: ActivatedRoute) {
        console.log('MatchComponent');

        this.route.data.subscribe(val => {
            this.match = val.match as Match;
            this.match.assignStats(val.statistics as Statistics[]);
        });
    }


}
