import { Component } from "@angular/core";
import { TagApiService } from "../services/tag-api.service";
import { MyHelper } from "../services/my-helper.service";
import { ActivatedRoute } from "@angular/router";
import { Player } from "../_models/player.model";
import { Match } from "../_models/match.model";
import { NgForm } from "@angular/forms";
import { MultiSeriesGraphComponent } from "../_d3/multi-series-graph.component";
import * as moment from 'moment';

@Component({
  selector: "player",
  templateUrl: "./player.template.html",
  styleUrls: ["./player.style.scss"]
})
export class PlayerComponent {
  objectKeys = Object.keys; // In template
  player: Player;
  newPseudo: string;
  rankings: any = {};
  charts: any = {
    history: {
      data: []
    }
  };
  matches: Match[];

  constructor(
    public tagApiService: TagApiService,
    private route: ActivatedRoute,
    public myHelper: MyHelper
  ) {
    console.log("PlayerComponent");
    this.route.data.subscribe(val => {
      this.player = val.player;
      this.matches = val.matches;
    });

    this.myHelper.algoList().forEach(algo => {
      this.tagApiService
        .getAlgoUserSeasonRankings(this.player.id, algo.key)
        .subscribe(res => {
          this.rankings[algo.key] = res.rankings;
        });

      this.tagApiService
        .getAlgoUserViz(this.player.id, algo.key, "history")
        .subscribe(res => {
          res.history.forEach((el, idx) => {
            var historyData = this.charts.history.data.find(
              d => d.key === el.season_id
            );
            if (!historyData) {
              historyData = {
                key: el.season_id,
                values: []
              };
              this.charts.history.data.push(historyData);
            }
            // If no date (default first value), set date to one day before next el
            el.datetime = el.datetime ? moment(el.datetime).toDate() : moment(res.history[idx + 1].datetime).subtract(1, 'day').toDate();
            historyData.values.push(el);
          });
          console.log(this.charts);
        });

        
    });
  }

  addPseudo(form: NgForm) {
    this.tagApiService
      .addPseudo(this.player, form.value["new-pseudo"])
      .subscribe(
        res => {
          alert(res["message"]);
          this.refreshUI();
        },
        err => {
          alert(err.error.message);
        }
      );
  }

  deactivateUser() {
    this.tagApiService.deactivateUser(this.player.id).subscribe(res => {
      alert(res["message"]);
      this.refreshUI();
    });
  }

  refreshUI() {
    this.tagApiService.getUser(this.player.id).subscribe(res => {
      this.player = new Player(res);
      console.log(this.player);
    });
  }

  promoteAdmin(form) {
    if (form.value.password.length < 3) {
      alert("Choose a longer password");
      return;
    }
    this.tagApiService
      .promoteAdmin(this.player.id, form.value.password)
      .subscribe(res => {
        alert("Success");
        this.refreshUI();
      });
  }

  downgradeAdmin() {
    this.tagApiService.downgradeAdmin(this.player.id).subscribe(res => {
      console.log(res);
    });
  }
}
