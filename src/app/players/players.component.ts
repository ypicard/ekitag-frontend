import {
  Component
} from '@angular/core';
import {
  TagApiService
} from '../services/tag-api.service';
import {
  FormsModule
} from '@angular/forms';
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'players',
  templateUrl: './players.template.html',
  styleUrls: ['./players.style.scss']
})

export class PlayersComponent {

  players: any;
  pseudo: String;
  trigram: String;

  constructor(public route: ActivatedRoute, public tagApiService: TagApiService) {
    console.log('PlayersComponent');
    this.route.data.subscribe(val => {
      this.players = val.players;
    });
  }

  createUser(trigram, pseudo) {
    if (!trigram || !pseudo) {
      alert('A player must have a trigram and a pseudo.')
      return;
    }

    trigram = trigram.toLowerCase(); // Only send downcase

    this.tagApiService.createUser(trigram, pseudo).subscribe(res => {
      alert(res['message'])
      this.refreshUI()
    }, error => {
      alert(error.error.message)
    })
  }

  refreshUI() {
    // this.tagApiService.getAllUsers().subscribe(res => {
    //   this.players = res;
    //   console.log(res)
    // })
  }

  getActivePlayers() {
    return this.players.filter(player => {
      return player.is_active;
    })
  }

  getUnactivePlayers() {
    return this.players.filter(player => {
      return !player.is_active;
    })
  }

}
