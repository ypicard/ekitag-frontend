import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../_models/player.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'player',
  templateUrl: './player.template.html',
  styleUrls: ['./player.style.scss']
})

export class PlayerComponent {

  player: Player;
  newPseudo: string;

  constructor(public tagApiService: TagApiService, private route: ActivatedRoute) {
    console.log('PlayerComponent');
      this.route.data.subscribe(val => {
        this.player = val.player;
      });
  }

  refreshUser() {
    this.tagApiService.getUser(this.player.id).subscribe(res => {
      this.player = new Player(res);
    });
  }

  addPseudo(newPseudo: string) {
    this.tagApiService.addPseudo(this.player, newPseudo).subscribe(res => {
      alert(res['message']);
      this.refreshUI();
    }, err => {
      alert(err.error.message);
    });
  }

  deactivateUser() {
    this.tagApiService.deactivateUser(this.player.id).subscribe(res => {
      alert(res['message']);
      this.refreshUI();
    })
  }

  refreshUI() {
    this.tagApiService.getUser(this.player.id).subscribe(res => {
      this.player = new Player(res);
    })
  }

  promoteAdmin(form) {
    if (form.value.password.length < 3) {
      alert('Choose a longer password');
      return
    }
    this.tagApiService.promoteAdmin(this.player.id, form.value.password).subscribe(res => {
      alert('Success');
      this.refreshUser();
    })
  }

  downgradeAdmin() {
    this.tagApiService.downgradeAdmin(this.player.id).subscribe(res => {
      console.log(res);
    })
  }


}
