import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';

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
import { NewMatchComponent } from './new-match/new-match.component';

import { SeasonsComponent } from './seasons/seasons.component';
import { SeasonComponent } from './season/season.component';

// PROVIDERS
import { TagApiService } from './services/tag-api.service';
import { AuthService } from './services/auth.service';

// PIPES
import { ArraySortPipe } from './pipes';

// LIBRAIRIES
import { ClipboardModule } from 'ngx-clipboard';
import { CookieService } from 'ng2-cookies';

// RESOLVERS
import { PlayersResolver } from './resolves/players.resolver';
import { SeasonsResolver } from './resolves/seasons.resolver';
import { SeasonResolver } from './resolves/season.resolver';
import { MatchesResolver } from './resolves/matches.resolver';
import { PendingMatchesResolver } from './resolves/pending-matches.resolver';

// Routes
const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  { path: 'matches', component: MatchesComponent, resolve: { matches: MatchesResolver, pendingMatches: PendingMatchesResolver } },
  { path: 'matches/:id', component: MatchComponent },
  { path: 'new_match', component: NewMatchComponent, resolve: { players: PlayersResolver } },

  { path: 'players', component: PlayersComponent, resolve: { players: PlayersResolver } },
  { path: 'players/:id', component: PlayerComponent },

  { path: 'seasons', component: SeasonsComponent, resolve: { seasons: SeasonsResolver } },
  { path: 'seasons/:id', component: SeasonComponent, resolve: { season: SeasonResolver } },

  { path: 'hall_of_fame', component: HallOfFameComponent },
  { path: 'algo', component: AlgoComponent, resolve: { players: PlayersResolver } },
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
    NewMatchComponent,
    HallOfFameComponent,
    AuthComponent,
    MatchComponent,
    SeasonsComponent,
    SeasonComponent,
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
  providers: [TagApiService, CookieService, PlayersResolver, AuthService, SeasonsResolver, SeasonResolver, MatchesResolver, PendingMatchesResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
