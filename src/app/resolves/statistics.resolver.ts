
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { TagApiService } from '../services/tag-api.service';
import { Statistics } from '../_models/statistics.model';

@Injectable()
export class MatchStatisticsResolver implements Resolve<any> {
    constructor(private tagApiService: TagApiService) { }
    resolve(route: ActivatedRouteSnapshot): Observable< Statistics[] > {
        return this.tagApiService.getMatchStats(route.params['id']);
    }
}
