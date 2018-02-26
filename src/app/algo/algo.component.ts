import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../_models/player.model';

@Component({
  selector: 'algo',
  templateUrl: './algo.template.html',
  styleUrls: ['./algo.style.scss']
})

export class AlgoComponent {

  players: Player[];
  selectedPlayers: Player[];
  redTeam: Player[];;
  blueTeam: Player[];

  constructor(public route: ActivatedRoute, private tagApiService: TagApiService) {
    console.log('AlgoComponent');
    this.route.data.subscribe(res => {
      console.log("YAP : " , res)
      yann, fournis une fonction pour sorter les users dans le component, pas dans le template
      console.log(this.players)
    });
  }

  selectPlayer(player:Player) {
    this.selectedPlayers.push(player);
    this.players.splice(this.players.indexOf(player), 1);
    this.clearTeams();
  }

  deselectPlayer(player:Player) {
    this.players.push(player);
    this.selectedPlayers.splice(this.selectedPlayers.indexOf(player), 1);
    this.clearTeams();
  }
  generateTeams(players:Player[]) {
    if (players.length < 2) return;
    // TODO : request algo here
    this.redTeam = this.selectedPlayers.slice(0, this.selectedPlayers.length / 2)
    this.blueTeam = this.selectedPlayers.slice(this.selectedPlayers.length / 2, this.selectedPlayers.length)
  }

  clearTeams() {
    this.redTeam = [];
    this.blueTeam = [];
  }

  copyTeams() {
    let teamsStr = "";
    teamsStr += "BLUE TEAM : "
    this.blueTeam.forEach((player, idx) => {
      teamsStr += player.pseudo
      if (idx < this.blueTeam.length - 1) teamsStr += ' - ';
    })
    teamsStr += "\nRED TEAM : "
    this.redTeam.forEach((player, idx) => {
      teamsStr += player.pseudo
      if (idx < this.redTeam.length - 1) teamsStr += ' - ';
    })

    return teamsStr;
  }

}
