import { Component } from '@angular/core';
import { TagApiService } from '../services/tag-api.service';

@Component({
	selector: 'leagues',
	templateUrl: './leagues.template.html',
	styleUrls: ['./leagues.style.scss']
})

export class LeaguesComponent {

	constructor(private tagApiService: TagApiService) {
		console.log('LeaguesComponent')
	}

}
