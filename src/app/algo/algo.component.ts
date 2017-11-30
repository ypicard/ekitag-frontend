import { Component } from '@angular/core';

@Component({
  selector: 'algo',
  templateUrl: './algo.template.html',
  styleUrls: ['./algo.style.scss']
})

export class AlgoComponent {

	players: any;

  constructor() {
  	this.players= [{trigram: 'YaP',
  	pseudo: 'Yapus'},
  	{trigram: 'FrM',
  	pseudo: 'Covfefe'},
  	{trigram: 'ViS',
  	pseudo: 'CousinVic'}]
  }

}
