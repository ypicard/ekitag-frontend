import { Statistics } from "./statistics.model";

export class Player {
  id: number;
  pseudo: string;
  usualPseudos: string[];
  isAdmin: boolean;
  isActive: boolean;
  goldStars: number;
  silverStars: number;
  bronzeStars: number;
  loserStars: number;
  statistics?: Statistics;

  constructor(playerHash: any, statsHash? : any) {
    this.id = playerHash.id;
    this.pseudo = playerHash.pseudo;
    this.usualPseudos = playerHash.usual_pseudos;
    this.isAdmin = playerHash.is_admin;
    this.isActive = playerHash.is_active;
    this.goldStars = playerHash.gold_stars;
    this.silverStars = playerHash.silver_stars;
    this.bronzeStars = playerHash.bronze_stars;
    this.loserStars = playerHash.loser_stars;
    if (playerHash.statistics) {
      this.statistics = new Statistics(playerHash.statistics);
    }
    if(statsHash){
      this.statistics = new Statistics(statsHash);
    }
  }
}
