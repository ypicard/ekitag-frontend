import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../_models/player.model';

@Component({
  selector: 'players',
  templateUrl: './players.template.html',
  styleUrls: ['./players.style.scss']
})
export class PlayersComponent {
  players: Player[];

  constructor(
    public route: ActivatedRoute,
    public tagApiService: TagApiService
  ) {
    console.log('PlayersComponent');
    this.route.data.subscribe(val => {
      this.players = val.players;
    });
  }

  createUser(form) {
    this.tagApiService.createUser(form.value.trigram, form.value.pseudo).subscribe(
      res => {
        alert(res['message']);
        this.refreshUI();
      },
      error => {
        alert(error.error.message);
      }
    );
  }

  refreshUI() {
    this.tagApiService.getAllUsers().subscribe(res => {
      this.players = res;
    });
  }

  getActivePlayers() {
    return this.players.filter(player => {
      return player.isActive;
    });
  }

  getInactivePlayers() {
    return this.players.filter(player => {
      return !player.isActive;
    });
  }
}
