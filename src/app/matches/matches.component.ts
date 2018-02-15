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

  confirmPendingMatch(id) {
    this.tagApiService.confirmPendingMatch(id).subscribe(res => {
      this.getPendingMatches();
      this.getRecentMatches();
    }, error => {
      alert(error.statusText);
    });
  }

  deletePendingMatch(id) {
    this.tagApiService.deletePendingMatch(id).subscribe(res => {
      this.getPendingMatches();
    }, error => {
      alert(error.statusText);
    });
  }

}
