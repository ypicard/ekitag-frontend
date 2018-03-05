import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { TagApiService } from "../services/tag-api.service";
import { Player } from "../_models/player.model";

@Injectable()
export class PlayerResolver implements Resolve<Player> {
  constructor(private tagApiService: TagApiService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Player> {
    return this.tagApiService.getUser(route.params["id"]);
  }
}
