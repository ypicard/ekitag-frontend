import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { ActivatedRoute } from '@angular/router';
import { Season } from '../_models/season.model';
import { Player } from "../_models/player.model";

@Component({
  selector: 'rankings',
  templateUrl: './rankings.template.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent {
  seasons: Season[];
  rankedPlayers: Player[];

  constructor(private tagApiService: TagApiService, public route: ActivatedRoute) {
    this.route.data.subscribe(val => {
      this.seasons = val.seasons;
      this.rankedPlayers = val.rankedPlayers.players;
    });
   }

}
