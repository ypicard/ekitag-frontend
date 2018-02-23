
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { TagApiService } from '../services/tag-api.service';

@Injectable()
export class SeasonResolver implements Resolve<any> {
    constructor(private tagApiService: TagApiService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.tagApiService.getSeason(route.params['id']);
    }
}
