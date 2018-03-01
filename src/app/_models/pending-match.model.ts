import { Statistics } from "./statistics.model";

export class PendingMatch {
  id: number;
  rScore: number;
  bScore: number;
  datetime: Date;
  b1: Statistics;
  b2: Statistics;
  b3: Statistics;
  b4: Statistics;
  b5: Statistics;
  b6: Statistics;
  r1: Statistics;
  r2: Statistics;
  r3: Statistics;
  r4: Statistics;
  r5: Statistics;
  r6: Statistics;

  redTeam: Statistics[];
  blueTeam: Statistics[];

  constructor(pendingMatchHash: any) {
    this.id = pendingMatchHash.id;
    this.rScore = pendingMatchHash.r_score;
    this.bScore = pendingMatchHash.b_score;
    this.datetime = pendingMatchHash.datetime;
    if (pendingMatchHash.b1 && pendingMatchHash.b1.user_pseudo) {
      this.b1 = new Statistics(pendingMatchHash.b1);
    }
    if (pendingMatchHash.b2 && pendingMatchHash.b2.user_pseudo) {
      this.b2 = new Statistics(pendingMatchHash.b2);
    }
    if (pendingMatchHash.b3 && pendingMatchHash.b3.user_pseudo) {
      this.b3 = new Statistics(pendingMatchHash.b3);
    }
    if (pendingMatchHash.b4 && pendingMatchHash.b4.user_pseudo) {
      this.b4 = new Statistics(pendingMatchHash.b4);
    }
    if (pendingMatchHash.b5 && pendingMatchHash.b5.user_pseudo) {
      this.b5 = new Statistics(pendingMatchHash.b5);
    }
    if (pendingMatchHash.b6 && pendingMatchHash.b6.user_pseudo) {
      this.b6 = new Statistics(pendingMatchHash.b6);
    }
    if (pendingMatchHash.r1 && pendingMatchHash.r1.user_pseudo) {
      this.r1 = new Statistics(pendingMatchHash.r1);
    }
    if (pendingMatchHash.r2 && pendingMatchHash.r2.user_pseudo) {
      this.r2 = new Statistics(pendingMatchHash.r2);
    }
    if (pendingMatchHash.r3 && pendingMatchHash.r3.user_pseudo) {
      this.r3 = new Statistics(pendingMatchHash.r3);
    }
    if (pendingMatchHash.r4 && pendingMatchHash.r4.user_pseudo) {
      this.r4 = new Statistics(pendingMatchHash.r4);
    }
    if (pendingMatchHash.r5 && pendingMatchHash.r5.user_pseudo) {
      this.r5 = new Statistics(pendingMatchHash.r5);
    }
    if (pendingMatchHash.r6 && pendingMatchHash.r6.user_pseudo) {
      this.r6 = new Statistics(pendingMatchHash.r6);
    }

    this.blueTeam = [
      this.b1,
      this.b2,
      this.b3,
      this.b4,
      this.b5,
      this.b6
    ].filter(pl => {
      return pl != null;
    });
    this.redTeam = [
      this.r1,
      this.r2,
      this.r3,
      this.r4,
      this.r5,
      this.r6
    ].filter(pl => {
      return pl != null;
    });
  }
}
