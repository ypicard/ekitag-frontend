import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http'; // Which one use ?

import { RouterModule, Routes } from '@angular/router'; // Routes
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // ng-bootstrap

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AlgoComponent } from './algo/algo.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';
import { AuthComponent } from './auth/auth.component';

import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './player/player.component';

import { MatchComponent } from './match/match.component';
import { MatchesComponent } from './matches/matches.component';

import { LeaguesComponent } from './leagues/leagues.component';

// PROVIDERS
import { TagApiService } from './services/tag-api.service';

// PIPES
import { ArraySortPipe } from './pipes';

// LIBRAIRIES
import { ClipboardModule } from 'ngx-clipboard';
import { CookieService } from 'ng2-cookies';

// RESOLVERS
import { PlayersResolver } from './resolves/players.resolver';
// Routes
const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  { path: 'matches', component: MatchesComponent },
  { path: 'matches/:id', component: MatchComponent },

  { path: 'players', component: PlayersComponent, resolve: { players: PlayersResolver } },
  { path: 'players/:id', component: PlayerComponent },

  { path: 'leagues', component: LeaguesComponent },

  { path: 'hall_of_fame', component: HallOfFameComponent },
  { path: 'algo', component: AlgoComponent },
  { path: 'auth', component: AuthComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayersComponent,
    PlayerComponent,
    AlgoComponent,
    TopBarComponent,
    MatchesComponent,
    HallOfFameComponent,
    AuthComponent,
    MatchComponent,
    LeaguesComponent,
    // PIPES
    ArraySortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // HttpModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    // LIBRAIRIES
    ClipboardModule,
    NgbModule.forRoot()
  ],
  providers: [TagApiService, CookieService, PlayersResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
