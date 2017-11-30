import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'; // Routes
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; // ng-bootstrap

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AlgoComponent } from './algo/algo.component';

// PIPES
import { ArraySortPipe } from './pipes';

// Routes
const appRoutes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'admin', component: AdminComponent},
  {path:'algo', component: AlgoComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    AlgoComponent,
    // PIPES
    ArraySortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
       appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
