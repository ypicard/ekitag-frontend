import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match } from '../_models/match.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'match',
  templateUrl: './match.template.html',
  styleUrls: ['./match.style.scss']
})
export class MatchComponent {
  match: Match;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService
  ) {
    console.log('MatchComponent');

    this.route.data.subscribe(val => {
      this.match = val.match as Match;
    });
  }
}
