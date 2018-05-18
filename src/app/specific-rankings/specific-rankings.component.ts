import { Component } from "@angular/core";
import { TagApiService } from "../services/tag-api.service";

@Component({
  selector: "specific-rankings",
  templateUrl: "./specific-rankings.template.html",
  styleUrls: ["./specific-rankings.style.scss"]
})
export class SpecificRankingsComponent {
  constructor(private tagApiService: TagApiService) {
    console.log("SpecificRankingsComponent");
  }
}
