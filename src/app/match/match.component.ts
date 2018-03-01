import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { ActivatedRoute } from '@angular/router';
import { Match } from '../_models/match.model';

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
            this.match = new Match(val.match);
            console.log(this.match)
        });
    }


}
