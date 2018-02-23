import {
  Component
} from '@angular/core';
import {
  TagApiService
} from '../services/tag-api.service';
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'season',
  templateUrl: './season.template.html',
  styleUrls: ['./season.style.scss']
})

export class SeasonComponent {;

  season: any;
  matches: any;

  constructor(public route: ActivatedRoute, private tagApiService: TagApiService) {
    console.log('SeasonComponent');
    this.route.data.subscribe(val => {
      this.season = val.season;
    });

    this.tagApiService.getSeasonMatches(this.season.id).subscribe(res => {
      this.matches = res;
    })

  }

}
