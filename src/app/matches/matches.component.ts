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
  selector: 'matches',
  templateUrl: './matches.template.html',
  styleUrls: ['./matches.style.scss']
})

export class MatchesComponent {

  matches: any;
  pendingMatches: any;

  constructor(private tagApiService: TagApiService, public route: ActivatedRoute) {
    console.log('MatchHistoryComponent')
    this.route.data.subscribe(val => {
      this.matches = val.matches;
      this.pendingMatches = val.pendingMatches;
    });
  }

  getRecentMatches() {
    this.tagApiService.getRecentMatches().subscribe(res => {
      this.matches = res;
    })
  }

  getPendingMatches() {
    this.tagApiService.getPendingMatches().subscribe(res => {
      this.pendingMatches = res;
    })
  }

  confirmPendingMatch(id) {
    this.tagApiService.confirmPendingMatch(id).subscribe(res => {
      this.updateUI();
    }, error => {
      alert(error.statusText);
    });
  }

  deletePendingMatch(id) {
    this.tagApiService.deletePendingMatch(id).subscribe(res => {
      this.updateUI();
    }, error => {
      alert(error.statusText);
    });
  }

  updateUI(){
    this.getPendingMatches();
    this.getRecentMatches();
  }

}
