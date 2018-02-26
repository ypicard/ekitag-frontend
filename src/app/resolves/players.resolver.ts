
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { TagApiService } from '../services/tag-api.service';
import {
    Player
} from '../_models/player.model';

@Injectable()
export class PlayersResolver implements Resolve<any> {
    constructor(private tagApiService: TagApiService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Player[]> {
        return this.tagApiService.getAllUsers();
    }
}
