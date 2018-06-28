import { Component, OnInit } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { Season } from '../_models/season.model';

@Component({
  selector: 'app-penalties',
  templateUrl: './penalties.component.html',
  styleUrls: ['./penalties.component.scss']
})
export class PenaltiesComponent implements OnInit {
  season: Season;
  seasons: Season[];
  penalties: any[]; // TODO: Penalty TS object

  constructor(private _api: TagApiService) {}

  ngOnInit() {
    this._api.getAllSeasons().subscribe(
      res => {
        this.seasons = res;
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
}
