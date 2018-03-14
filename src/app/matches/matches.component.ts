import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { ActivatedRoute } from '@angular/router';
import { Match } from '../_models/match.model';
import { AuthService } from '../services/auth.service';
import { PendingMatch } from "../_models/pending-match.model";


@Component({
  selector: 'matches',
  templateUrl: './matches.template.html',
  styleUrls: ['./matches.style.scss']
})

export class MatchesComponent {

  matches: Match[];
  pendingMatches: PendingMatch[];

  constructor(private tagApiService: TagApiService, public route: ActivatedRoute, public authService: AuthService) {
    console.log('MatchHistoryComponent');
    this.route.data.subscribe(val => {
      this.matches = val.matches as Match[];
      this.pendingMatches = val.pendingMatches as PendingMatch[];
    });
  }

  getMatches(): void {
    this.tagApiService.getMatches().subscribe(res => {
      this.matches = res;
    });
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
      alert(error.error.message);
    });
  }

  deletePendingMatch(id): void {
    this.tagApiService.deletePendingMatch(id).subscribe(res => {
      this.updateUI();
    }, error => {
      alert(error.error.message);
    });
  }

  updateUI(): void {
    this.getPendingMatches();
    this.getMatches();
  }

}
