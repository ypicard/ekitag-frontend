export class Penalty {
  id: number;
  userId: number;
  value: number;
  desc: string;
  matchId: number;
  seasonId: number;

  constructor(penaltyHash: any) {
    this.id = penaltyHash.id;
    this.userId = penaltyHash.user_id;
    this.value = penaltyHash.value;
    this.desc = penaltyHash.description;
    this.matchId = penaltyHash.match_id;
    this.seasonId = penaltyHash.season_id;
  }
}
