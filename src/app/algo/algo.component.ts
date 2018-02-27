import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../_models/player.model';
import { MyHelper } from '../services/my-helper.service'

@Component({
  selector: 'algo',
  templateUrl: './algo.template.html',
  styleUrls: ['./algo.style.scss']
})

export class AlgoComponent {

  players: Player[] = [];
  selectedPlayers: Player[] = [];
  redTeam: Player[] = [];
  blueTeam: Player[] = [];
  quality: number;

  constructor(public route: ActivatedRoute, private tagApiService: TagApiService, public myHelper: MyHelper) {
    console.log('AlgoComponent');
    this.route.data.subscribe(res => {
      this.players = res.players as Player[];
    });
  }

  selectPlayer(player: Player): void {
    this.selectedPlayers.push(player);
    this.players.splice(this.players.indexOf(player), 1);
    this.clearTeams();
  }

  deselectPlayer(player: Player): void {
    this.players.push(player);
    this.selectedPlayers = this.selectedPlayers.concat(this.redTeam.splice(0, this.redTeam.length));
    this.selectedPlayers = this.selectedPlayers.concat(this.blueTeam.splice(0, this.blueTeam.length));
    this.selectedPlayers.splice(this.selectedPlayers.indexOf(player), 1);
    this.clearTeams();
  }
  generateTeams(players: Player[]): void {
    if (players.length < 2) return;

    this.tagApiService.runMusigmaTeam(players.map(pl => { return pl.id; })).subscribe(res => {

      res['r_ids'].forEach(r_id => {
        this.redTeam.push(this.selectedPlayers.splice(this.selectedPlayers.findIndex(pl => { return pl.id === r_id; }), 1)[0]);
      });
      res['b_ids'].forEach(r_id => {
        this.blueTeam.push(this.selectedPlayers.splice(this.selectedPlayers.findIndex(pl => { return pl.id === r_id; }), 1)[0]);
      });
      this.quality = res['quality'];
    },
      err => {
        alert(err.error.message);
      });
  }

  clearTeams(): void {
    this.redTeam = [];
    this.blueTeam = [];
  }

  copyTeams(): string {
    let teamsStr = '';
    teamsStr += 'BLUE TEAM : '
    this.blueTeam.forEach((player, idx) => {
      teamsStr += player.pseudo
      if (idx < this.blueTeam.length - 1) teamsStr += ' - ';
    })
    teamsStr += '\nRED TEAM : '
    this.redTeam.forEach((player, idx) => {
      teamsStr += player.pseudo
      if (idx < this.redTeam.length - 1) teamsStr += ' - ';
    })

    return teamsStr;
  }

}
