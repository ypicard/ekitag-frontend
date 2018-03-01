  import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ng2-cookies';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { Player } from '../_models/player.model';
import { Match } from '../_models/match.model';
import { PendingMatch } from '../_models/pending-match.model';

@Injectable()
export class TagApiService {

  // BASE_URL = "https://ekitag-api.herokuapp.com/v1/"
  BASE_URL = "http://localhost:5000/v1/"

  constructor(private http: HttpClient, public cookieService: CookieService) {
    console.log('TagApiService');
  }

  // ------------------------- ADMIN
  isLoggedIn(): boolean {
    return this.cookieService.check('Bearer');
  }

  getAdminHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.cookieService.get('Bearer'));
    return headers;
  }

  promoteAdmin(id: number, password: string): Observable<any> {
    let formData = new FormData();
    formData.append('user_id', id.toString())
    formData.append('password', password)

    return this.http.post(this.BASE_URL + 'users/' + id + '/promote', formData, {
      headers: this.getAdminHeaders()
    })
  }

  downgradeAdmin(id: number): Observable<any> {
    return this.http.delete(this.BASE_URL + 'users/' + id + '/promote', {
      headers: this.getAdminHeaders()
    })
  }

  login(trigram: string, password: string): Observable<any> {
    let formData = new FormData();
    formData.append('login', trigram);
    formData.append('password', password);
    return this.http.post(this.BASE_URL + 'admin/', formData);
  }

  deactivateUser(id: number): Observable<any> {
    // TODO: fix in back i think
    return this.http.delete(this.BASE_URL + 'users/' + id);
  }

  // ------------------------- USERS
  getUser(id: number): Observable<any> {
    return this.http.get(this.BASE_URL + 'users/' + id)
  }

  getAllUsers(): Observable<Player[]> {
    return this.http.get(this.BASE_URL + 'users').map((res: any[]) => {
      return res.map(pl => {
        return new Player(pl);
      })
    })
  }

  createUser(trigram: string, pseudo: string): Observable<any> {
    let formData = new FormData();
    formData.append('trigram', trigram)
    formData.append('pseudo', pseudo)
    return this.http.post(this.BASE_URL + 'users', formData)
  }

  addPseudo(user: Player, newPseudo: string): Observable<any> {
    if (user.usualPseudos.indexOf(newPseudo) >= 0) return; // No duplicate pseudo
    let formData = new FormData();
    formData.append('user_id', user.id.toString());
    formData.append('pseudo', user.pseudo);
    user.usualPseudos.forEach(pseudo => {
      formData.append('usual_pseudos', pseudo);
    });
    formData.append('usual_pseudos', newPseudo);

    return this.http.put(this.BASE_URL + 'users/' + user.id, formData);
  }

  // ------------------------- MATCHES

  getMatch(id: number): Observable<Match> {
    return this.http.get(this.BASE_URL + 'matches/' + id).map((res: any[]) => new Match(res));
  }

  getMatches(): Observable<Match[]> {
    return this.http.get(this.BASE_URL + 'matches').map((res: any[]) => {
      return res.map(m => { return new Match(m); });
    });
  }

  getPendingMatches(): Observable<PendingMatch[]> {
    return this.http.get(this.BASE_URL + 'matches/pending').map((res: any[]) => {
      return res.map(m => { return new PendingMatch(m); });
    });
  }

  getPendingMatch(id: number): Observable<PendingMatch> {
    return this.http.get(this.BASE_URL + 'matches/pending/' + id).map(res => new PendingMatch(res));
  }

  deletePendingMatch(id: number): Observable<any> {
    return this.http.delete(this.BASE_URL + 'matches/pending/' + id, {
      headers: this.getAdminHeaders()
    });
  }

  confirmPendingMatch(id: number): Observable<any> {
    return this.http.put(this.BASE_URL + 'matches/pending/' + id, {}, {
      headers: this.getAdminHeaders()
    });
  }

  addPendingMatch(match, stats): Observable<any> {
    let matchFormData = new FormData();
    for (var k in match) {
      matchFormData.append(k, match[k]);
    }

    return this.http.post(this.BASE_URL + 'matches/pending', matchFormData, {}).map(res => {
      let matchId = res['value'];
      let statRequests = [];

      stats.forEach(pl => {
        let statsFormData = new FormData();
        statsFormData.append('match_id', matchId.toString());
        for (let k in pl) {
          if (pl[k] != null) {
            statsFormData.append(k, pl[k]);
          }
        }

        statRequests.push(this.http.post(this.BASE_URL + 'matches/pending/' + matchId + '/stats', statsFormData, {}).subscribe(res => { return res }));
      });

      return Observable.forkJoin(statRequests);

    }, err => {
      console.log(err);
    });
  }

  // ------------------------- SEASONS

  getAllSeasons(): Observable<any> {
    return this.http.get(this.BASE_URL + 'seasons');
  }

  getSeason(id: number): Observable<any> {
    return this.http.get(this.BASE_URL + 'seasons/' + id);
  }

  getSeasonMatches(id: number): Observable<any> {
    return this.http.get(this.BASE_URL + 'seasons/' + id + '/matches');
  }

  endSeason(id: number): Observable<any> {
    return this.http.delete(this.BASE_URL + 'seasons/' + id, {
      headers: this.getAdminHeaders()
    });
  }

  createSeason(name: string, maxMatches: number, maxTimeInSeconds: number): Observable<any> {
    let formData = new FormData();
    formData.append('name', name);
    formData.append("max_time", maxTimeInSeconds.toString());
    formData.append('max_matches', maxMatches.toString());

    return this.http.post(this.BASE_URL + 'seasons', formData, {
      headers: this.getAdminHeaders()
    });
  }

  // ------------------------- ALGO: MUSIGMA TEAM
  runMusigmaTeam(playerIds) {
    let reqParams = new HttpParams();
    playerIds.forEach(id => {
      reqParams = reqParams.append('ids', id);
    });
    return this.http.get(this.BASE_URL + 'algo/musigma_team', {params: reqParams});
  }


}
