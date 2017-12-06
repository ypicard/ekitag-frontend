import { Component } from '@angular/core';

@Component({
  selector: 'algo',
  templateUrl: './algo.template.html',
  styleUrls: ['./algo.style.scss']
})

export class AlgoComponent {

  players: any;
  selectedPlayers: any = [];
  redTeam: any = [];
  blueTeam: any = []



  constructor() {
    this.players = [{
      id: 1,
      trigram: 'YaP',
      pseudo: 'Yapus'
    },
    {
      id: 2,
      trigram: 'FrM',
      pseudo: 'Covfefe'
    },
    {
      id: 3,
      trigram: 'ViS',
      pseudo: 'CousinVic'
    },
    {
      id: 4,
      trigram: 'YoB',
      pseudo: 'Roxxor'
    }]
  }

  selectPlayer(player) {
    this.selectedPlayers.push(player);
    this.players.splice(this.players.indexOf(player), 1);
    this.clearTeams();
  }

  deselectPlayer(player) {
    this.players.push(player);
    this.selectedPlayers.splice(this.selectedPlayers.indexOf(player), 1);
    this.clearTeams();
  }
  generateTeams(players) {
    if (players.length < 2) return;
    // TODO : request algo here
    this.redTeam = this.selectedPlayers.slice(0, this.selectedPlayers.length / 2)
    this.blueTeam = this.selectedPlayers.slice(this.selectedPlayers.length / 2, this.selectedPlayers.length)
  }

  clearTeams(){
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
