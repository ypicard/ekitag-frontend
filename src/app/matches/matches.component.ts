import {
  Component
} from '@angular/core';
import {
  TagApiService
} from '../services/tag-api.service';
import {
  ActivatedRoute
} from '@angular/router';
import { 
  Match
} from '../_models/match.model'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'matches',
  templateUrl: './matches.template.html',
  styleUrls: ['./matches.style.scss']
})

export class MatchesComponent {

  matches: Match[];
  pendingMatches: Match[];

  constructor(private tagApiService: TagApiService, public route: ActivatedRoute, public authService: AuthService) {
    console.log('MatchHistoryComponent');
    this.route.data.subscribe(val => {
      this.matches = val.matche as Match[];
      this.pendingMatches = val.pendingMatches as Match[];
    });
  }

  getRecentMatches(): void {
    this.tagApiService.getRecentMatches().subscribe(res => {
      this.matches = res;
    })
  }

  getPendingMatches(): void {
    this.tagApiService.getPendingMatches().subscribe(res => {
      this.pendingMatches = res;
    });
  }

  confirmPendingMatch(id): void {
    this.tagApiService.confirmPendingMatch(id).subscribe(res => {
      this.updateUI();
    }, error => {
      alert(error.statusText);
    });
  }

  deletePendingMatch(id): void {
    this.tagApiService.deletePendingMatch(id).subscribe(res => {
      this.updateUI();
    }, error => {
      alert(error.statusText);
    });
  }

  updateUI(): void {
    this.getPendingMatches();
    this.getRecentMatches();
  }

}
