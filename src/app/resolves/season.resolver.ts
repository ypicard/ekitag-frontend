
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Season } from '../_models/season.model';
import { TagApiService } from '../services/tag-api.service';

@Injectable()
export class SeasonResolver implements Resolve<Season> {
    constructor(private tagApiService: TagApiService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Season> {
        return this.tagApiService.getSeason(route.params['id']);
    }
}
