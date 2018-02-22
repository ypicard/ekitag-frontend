import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.template.html',
  styleUrls: ['./top-bar.style.scss']
})

export class TopBarComponent {

  constructor(public authService: AuthService) {
  }

}
