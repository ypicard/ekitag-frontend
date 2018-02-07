import {
  Component
} from '@angular/core';
import {
  TagApiService
} from '../services/tag-api.service';

@Component({
  selector: 'matches',
  templateUrl: './matches.template.html',
  styleUrls: ['./matches.style.scss']
})

export class MatchesComponent {

  recentMatches: any;
  pendingMatches: any;

  constructor(private tagApiService: TagApiService) {
    console.log('MatchHistoryComponent')
    this.getRecentMatches();
    this.getPendingMatches();
  }

  getRecentMatches() {
    this.tagApiService.getRecentMatches().subscribe(res => {
      this.recentMatches = res;
    })
  }

  getPendingMatches() {
    this.tagApiService.getPendingMatches().subscribe(res => {
      this.pendingMatches = res;
    })
  }

}
