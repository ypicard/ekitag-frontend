import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http'; // Which one use ?

import { RouterModule, Routes } from '@angular/router'; // Routes
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // ng-bootstrap

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AlgoComponent } from './algo/algo.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MatchHistoryComponent } from './match-history/match-history.component';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';
import { AuthComponent } from './auth/auth.component';
import { MatchComponent } from './match/match.component';

// PROVIDERS
import { TagApiService } from './services/tag-api.service';

// PIPES
import { ArraySortPipe } from './pipes';

// LIBRAIRIES
import { ClipboardModule } from 'ngx-clipboard';
import { CookieService } from 'ng2-cookies';

// Routes
const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'matches', component: MatchHistoryComponent },
  { path: 'matches/:id', component: MatchComponent },
  { path: 'hall_of_fame', component: HallOfFameComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/user/:id', component: AdminUserComponent },
  { path: 'algo', component: AlgoComponent },
  { path: 'auth', component: AuthComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    AdminUserComponent,
    AlgoComponent,
    TopBarComponent,
    MatchHistoryComponent,
    HallOfFameComponent,
    AuthComponent,
    MatchComponent,
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
    NgbModule.forRoot(),
  ],
  providers: [TagApiService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
