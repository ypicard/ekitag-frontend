import { Injectable } from '@angular/core';
import {
    Player
} from '../_models/player.model';

@Injectable()
export class MyHelper {
    constructor() {
        console.log('MyHelperService');
    }

    sortPlayers(players, field) {
        return players.sort((pl1, pl2) => {
            return pl1[field] > pl2[field]
        });
    }

}
