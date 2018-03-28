import { Component, OnInit } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../_models/player.model';
import { AuthService } from '../services/auth.service';
import { PendingMatch } from '../_models/pending-match.model';

@Component({
  selector: 'rankings',
  templateUrl: './rankings.template.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent {
  rankedPlayers: Player[];

  constructor(private tagApiService: TagApiService, public route: ActivatedRoute, public authService: AuthService) {
    this.route.data.subscribe(val => {
      this.rankedPlayers = val.rankedPlayers.players;
      console.log(this.rankedPlayers)
    });
   }

}
