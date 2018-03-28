import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { TagApiService } from '../services/tag-api.service';
import { AlgoRanking } from '../_models/algo-ranking.model';

@Injectable()
export class RankingsResolver implements Resolve<AlgoRanking> {
  constructor(private tagApiService: TagApiService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<AlgoRanking> {
    return this.tagApiService.getAlgoRanking('musigma_team', null);
  }
}
