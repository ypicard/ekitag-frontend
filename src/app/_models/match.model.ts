import { Player } from './player.model';

export class Match {
  id: number;
  b1Id: number;
  b2Id: number;
  b3Id: number;
  b4Id: number;
  b5Id: number;
  b6Id: number;
  r1Id: number;
  r2Id: number;
  r3Id: number;
  r4Id: number;
  r5Id: number;
  r6Id: number;
  rScore: number;
  bScore: number;
  validator: Player;
  datetime: Date;

  constructor(matchHash: any) {
    this.id = matchHash.id;
    this.b1Id = matchHash.b1_id;
    this.b2Id = matchHash.b2_id;
    this.b3Id = matchHash.b3_id;
    this.b4Id = matchHash.b4_id;
    this.b5Id = matchHash.b5_id;
    this.b6Id = matchHash.b6_id;
    this.r1Id = matchHash.r1_id;
    this.r2Id = matchHash.r2_id;
    this.r3Id = matchHash.r3_id;
    this.r4Id = matchHash.r4_id;
    this.r5Id = matchHash.r5_id;
    this.r6Id = matchHash.r6_id;
    this.rScore = matchHash.r_score;
    this.bScore = matchHash.b_score;
    this.datetime = matchHash.datetime;
    this.validator = matchHash.validator as Player;
  }

}
