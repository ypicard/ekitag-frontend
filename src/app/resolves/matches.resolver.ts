
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { TagApiService } from '../services/tag-api.service';
import {  Match } from '../_models/match.model';

@Injectable()
export class MatchesResolver implements Resolve<any> {
    constructor(private tagApiService: TagApiService) { }
    resolve(route: ActivatedRouteSnapshot): Observable< Match[] > {
        return this.tagApiService.getMatches();
    }
}
