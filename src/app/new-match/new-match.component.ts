import { Component } from "@angular/core";
import { TagApiService } from "../services/tag-api.service";
import { ActivatedRoute } from "@angular/router";
import { Player } from "../_models/player.model";
import { Router } from "@angular/router";

@Component({
  selector: "new-match",
  templateUrl: "./new-match.template.html",
  styleUrls: ["./new-match.style.scss"]
})
export class NewMatchComponent {
  currentTeam: string = "red";
  players: Player[];
  teams: { [id: string]: Player[] } = {
    red: [],
    blue: []
  };

  constructor(
    private tagApiService: TagApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log("NewMatchComponent");
    this.route.data.subscribe(val => {
      this.players = val.players as Player[];
    });
  }

  toggleCurrentTeam(): void {
    this.currentTeam = this.currentTeam === "red" ? "blue" : "red";
  }

  selectPlayer(player): void {
    this.players.splice(this.players.indexOf(player), 1);
    this.teams[this.currentTeam].push(player);
    player.team = this.currentTeam;
  }

  removePlayer(player): void {
    this.players.push(player);
    this.teams[player.team].splice(this.teams[player.team].indexOf(player), 1);
    delete player.team;
  }

  submitMatch(form): void {
    if (this.teams.red.length < 1 || this.teams.blue.length < 1) {
      alert("Needs one player in each team.");
      return;
    }
    // Match object
    let match = {
      b_score: form.blueScore,
      r_score: form.redScore,
      datetime: new Date().toISOString(),
      duration: form.duration * 60, // in seconds
      r1_pseudo: null,
      r2_pseudo: null,
      r3_pseudo: null,
      r4_pseudo: null,
      r5_pseudo: null,
      r6_pseudo: null,
      b1_pseudo: null,
      b2_pseudo: null,
      b3_pseudo: null,
      b4_pseudo: null,
      b5_pseudo: null,
      b6_pseudo: null
    };

    this.teams.red.forEach((pl, i) => {
      match["r" + (i + 1) + "_pseudo"] = pl.pseudo;
    });
    this.teams.blue.forEach((pl, i) => {
      match["b" + (i + 1) + "_pseudo"] = pl.pseudo;
    });

    // Stats object
    let stats = [];
    for (var p in form.players) {
      let pl = form.players[p];
      stats.push({
        match_id: null,
        user_pseudo: pl.pseudo,
        score: pl.score,
        tags: pl.tags,
        popped: pl.popped,
        grabs: pl.grabs,
        drops: pl.drops,
        hold: pl.hold,
        captures: pl.captures,
        prevent: pl.prevent,
        returns: pl.returns,
        support: pl.support,
        pups: pl.pups
      });
    }

    this.tagApiService.addPendingMatch(match, stats).subscribe(
      res => {
        alert("Match created, waiting for validation !");
        this.router.navigate(["/matches"]);
      },
      err => {
        alert(err.error.message);
      }
    );
  }
}
