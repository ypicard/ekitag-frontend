import { Component } from "@angular/core";
import { TagApiService } from "../services/tag-api.service";
import { ActivatedRoute } from "@angular/router";
import { Season } from "../_models/season.model";

@Component({
  selector: "specific-ranking",
  templateUrl: "./specific-ranking.template.html",
  styleUrls: ["./specific-ranking.style.scss"]
})
export class SpecificRankingComponent {
  methods = ["AVG", "SUM", "MAX", "MIN"];
  seasons: Season[];
  stats = [
    "score",
    "tags",
    "popped",
    "grabs",
    "drops",
    "hold",
    "captures",
    "prevent",
    "returns",
    "support",
    "pups"
  ];

  selectedSeason: any = null;
  selectedMethod: string = this.methods[0];
  selectedStat: string = this.stats[0];
  ranking: any;

  constructor(
    private tagApiService: TagApiService,
    private route: ActivatedRoute
  ) {
    console.log("SpecificRankingComponent");
    this.route.data.subscribe(val => {
      this.seasons = val.seasons;
    });
    this.getRanking();
  }

  setMethod(method) {
    this.selectedMethod = method;
    this.getRanking();
  }
  setStat(stat) {
    this.selectedStat = stat;
    this.getRanking();
  }

  getRanking() {
    this.tagApiService
      .getSpecificRanking(
        this.selectedStat,
        this.selectedMethod,
        this.selectedSeason ? this.selectedSeason.id : null
      )
      .subscribe(res => {
        this.ranking = res;
      });
  }
}
