import { Player } from './player.model';

export class Match {
  id: number;
  b1: Player;
  b2: Player;
  b3: Player;
  b4: Player;
  b5: Player;
  b6: Player;
  r1: Player;
  r2: Player;
  r3: Player;
  r4: Player;
  r5: Player;
  r6: Player;
  players: Player[];
  redTeam: Player[];
  blueTeam: Player[];
  rScore: number;
  bScore: number;
  validator: Player;
  datetime: Date;

  constructor(matchHash: any) {
    this.id = matchHash.id;

    // Should be done in backend
    if(matchHash.b1 && matchHash.b1.id != null) { this.b1 = matchHash.b1 as Player; }
    if (matchHash.b2 && matchHash.b2.id != null) { this.b2 = matchHash.b2 as Player; }
    if (matchHash.b3 && matchHash.b3.id != null) { this.b3 = matchHash.b3 as Player; }
    if (matchHash.b4 && matchHash.b4.id != null) { this.b4 = matchHash.b4 as Player; }
    if (matchHash.b5 && matchHash.b5.id != null) { this.b5 = matchHash.b5 as Player; }
    if (matchHash.b6 && matchHash.b6.id != null) { this.b6 = matchHash.b6 as Player; }
    if (matchHash.r1 && matchHash.r1.id != null) { this.r1 = matchHash.r1 as Player; }
    if (matchHash.r2 && matchHash.r2.id != null) { this.r2 = matchHash.r2 as Player; }
    if (matchHash.r3 && matchHash.r3.id != null) { this.r3 = matchHash.r3 as Player; }
    if (matchHash.r4 && matchHash.r4.id != null) { this.r4 = matchHash.r4 as Player; }
    if (matchHash.r5 && matchHash.r5.id != null) { this.r5 = matchHash.r5 as Player; }
    if (matchHash.r6 && matchHash.r6.id != null) { this.r6 = matchHash.r6 as Player; }

    this.rScore = matchHash.r_score;
    this.bScore = matchHash.b_score;
    this.datetime = matchHash.datetime;
    this.validator = matchHash.validator as Player;
    // Create teams
    this.blueTeam = [this.b1, this.b2, this.b3, this.b4, this.b5, this.b6].filter(pl => { return pl !=  null; });
    this.redTeam = [this.r1, this.r2, this.r3, this.r4, this.r5, this.r6].filter(pl => { return pl !=  null; });
    this.players = this.redTeam.concat(this.blueTeam);
    // Sort players on score
    this.redTeam.sort(player => { return player.statistics ? player.statistics.score : 0; });
    this.blueTeam.sort(player => { return player.statistics ? player.statistics.score : 0; });
  }

  assignStats(statsArray) {
    this.players.forEach(pl => {
      pl.statistics = statsArray.find(st => {
        return st.userId === pl.id; });
    })
  }

}
