
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { TagApiService } from '../services/tag-api.service';
import { Season } from "../_models/season.model";

@Injectable()
export class SeasonsResolver implements Resolve<Season[]> {
    constructor(private tagApiService: TagApiService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Season[]> {
        return this.tagApiService.getAllSeasons();
    }
}
