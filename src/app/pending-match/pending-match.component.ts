import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { ActivatedRoute } from '@angular/router';
import { PendingMatch } from '../_models/pending-match.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'pending-match',
  templateUrl: './pending-match.template.html',
  styleUrls: ['./pending-match.style.scss']
})
export class PendingMatchComponent {
  pendingMatch: PendingMatch;

  constructor(
    public tagApiService: TagApiService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('PendingMatchComponent');

    this.route.data.subscribe(val => {
      this.pendingMatch = val.pendingMatch as PendingMatch;
    });
  }

  confirmPendingMatch(id): void {
    this.tagApiService.confirmPendingMatch(id).subscribe(
      res => {
        this.router.navigate(['/matches']);
      },
      error => {
        console.log(error);
        alert(error.statusText);
      }
    );
  }

  deletePendingMatch(id): void {
    this.tagApiService.deletePendingMatch(id).subscribe(
      res => {
        this.router.navigate(['/matches']);
      },
      error => {
        alert(error.statusText);
      }
    );
  }
}
