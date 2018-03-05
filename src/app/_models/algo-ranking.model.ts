import { Player } from "./player.model";

export class AlgoRanking {
  algo: string;
  players: Player[];

  constructor(algoHash) {
    this.algo = algoHash.algo;
    this.players = algoHash.users.map(pl => {
      return new Player(pl);
    });
  }
}
