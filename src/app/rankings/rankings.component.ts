import { Component, OnInit } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../_models/player.model';
import { AuthService } from '../services/auth.service';
import { PendingMatch } from "../_models/pending-match.model";

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {
  players: Player[]
  rankedPlayers: Player[]

  constructor(private tagApiService: TagApiService, public route: ActivatedRoute, public authService: AuthService) {
    this.route.data.subscribe(val => {
      this.players = val as Player[];
    });
   }

  ngOnInit() {
    this.tagApiService.getAlgoRanking("musigma_team",null).subscribe(d => {
      this.rankedPlayers = d.players;
      console.log(d)
    })
    console.log(this.players)
  }

}
