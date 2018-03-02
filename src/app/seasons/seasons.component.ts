import { Component } from "@angular/core";
import { TagApiService } from "../services/tag-api.service";
import { ActivatedRoute } from "@angular/router";
import { Season } from "../_models/season.model";

@Component({
  selector: "seasons",
  templateUrl: "./seasons.template.html",
  styleUrls: ["./seasons.style.scss"]
})
export class SeasonsComponent {
  seasons: Season[];
  currentSeason: Season;

  constructor(
    public route: ActivatedRoute,
    private tagApiService: TagApiService
  ) {
    console.log("SeasonsComponent");
    this.route.data.subscribe(val => {
      this.seasons = val.seasons;
      this.currentSeason = this.seasons.find(season => {
        return season.running;
      });
      console.log(this.seasons)
    });
  }

  createSeason(form) {
    let name = form.value.name;
    if (this.seasons.map(s => s.name).includes(name)) {
      // No 2 season shall have same
      alert("Name already taken");
      return;
    }
    let nbDays = form.value.maxMatches * 24 * 60 * 60; // Needs to be in seconds
    this.tagApiService
      .createSeason(name, form.value.maxMatches, form.value.maxTime)
      .subscribe(
        res => {
          alert("Season created !");
          this.updateUI();
        },
        err => {
          console.log(err);
          alert(err.error.message);
          
        }
      );
  }

  endSeason(season) {
    this.tagApiService.endSeason(season.id).subscribe(
      res => {
        alert("Season ended !");
        this.updateUI();
      },
      err => {
        alert(err.error.message);
      }
    );
  }

  updateUI() {
    this.tagApiService.getAllSeasons().subscribe(res => {
      this.seasons = res;
      this.currentSeason = this.seasons.find(season => {
        return season.running;
      });
    });
  }
}
