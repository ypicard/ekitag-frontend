import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { ActivatedRoute } from '@angular/router';
import { Season } from '../_models/season.model';
import { Match } from '../_models/match.model';
import { AlgoRanking } from '../_models/algo-ranking.model';
import { MyHelper } from "../services/my-helper.service";

@Component({
  selector: 'season',
  templateUrl: './season.template.html',
  styleUrls: ['./season.style.scss']
})
export class SeasonComponent {
  season: Season;
  rankings: AlgoRanking[] = [];
  matches: Match[];

  constructor(
    public route: ActivatedRoute,
    private tagApiService: TagApiService,
    public myHelper: MyHelper
  ) {
    console.log('SeasonComponent');
    this.route.data.subscribe(val => {
      this.season = val.season;
    });

    this.tagApiService.getSeasonMatches(this.season.id).subscribe(res => {
      this.matches = res;
    });

    this.myHelper.algoList().forEach(algo => {
      this.tagApiService.getAlgoRanking(algo.key, this.season.id).subscribe(res => {
        this.rankings.push(res);
      });
    });
  }
}
