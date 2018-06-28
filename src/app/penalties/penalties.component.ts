import { Component, OnInit } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { Season } from '../_models/season.model';
import { Penalty } from '../_models/penalty.model';
import { AuthService } from '../services/auth.service';
import { Player } from '../_models/player.model';

@Component({
  selector: 'app-penalties',
  templateUrl: './penalties.component.html',
  styleUrls: ['./penalties.component.scss']
})
export class PenaltiesComponent implements OnInit {
  season: Season;
  seasons: Season[];
  players: Player[];
  penalties: Penalty[];

  constructor(private _api: TagApiService, public authService: AuthService) {}

  ngOnInit() {
    this._api.getAllSeasons().subscribe(
      res => {
        this.seasons = res;
      },
      err => {
        console.log(err);
      }
    );

    this._api.getAllUsers().subscribe(
      res => {
        this.players = res;
      },
      err => {
        console.log(err);
      }
    );

    this.fetchPenalties();
  }

  fetchPenalties() {
    this._api.getPenalties(this.season ? this.season.id : null).subscribe(
      res => {
        this.penalties = res;
      },
      err => {
        console.log(err);
      }
    );
  }


  addPenalty(form) {
    console.log(form)
    this._api.postPenalty(form.value.player.id, form.value.season.id, form.value.desc, form.value.value).subscribe(
      res => {
        console.log(res);
        this.fetchPenalties();
      },
      err => {
        console.log(err);
      }
    );
  }
}
