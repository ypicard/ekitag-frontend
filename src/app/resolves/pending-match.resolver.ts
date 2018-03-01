import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { TagApiService } from "../services/tag-api.service";
import { PendingMatch } from "../_models/pending-match.model";

@Injectable()
export class PendingMatchResolver implements Resolve<any> {
  constructor(private tagApiService: TagApiService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<PendingMatch> {
    return this.tagApiService.getPendingMatch(route.params['id']);
  }
}
