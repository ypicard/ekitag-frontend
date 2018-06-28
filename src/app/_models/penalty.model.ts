export class Penalty {
  id: number;
  userId: number;
  value: number;
  desc: string;
  seasonId: number;

  constructor(penaltyHash: any) {
    this.id = penaltyHash.id;
    this.userId = penaltyHash.user_id;
    this.value = penaltyHash.value;
    this.desc = penaltyHash.description;
    this.seasonId = penaltyHash.season_id;
  }
}
