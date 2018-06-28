import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ng2-cookies';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { Player } from '../_models/player.model';
import { Season } from '../_models/season.model';
import { Match } from '../_models/match.model';
import { AlgoRanking } from '../_models/algo-ranking.model';
import { PendingMatch } from '../_models/pending-match.model';
import { environment } from '../../environments/environment';
import { using } from 'rxjs/observable/using';
import { Penalty } from '../_models/penalty.model';

@Injectable()
export class TagApiService {
  API_BASE_URL = environment.apiBaseUrl;

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
    formData.append('user_id', id.toString());
    formData.append('password', password);

    return this.http.post(this.API_BASE_URL + 'users/' + id + '/promote', formData, {
      headers: this.getAdminHeaders()
    });
  }

  downgradeAdmin(id: number): Observable<any> {
    return this.http.delete(this.API_BASE_URL + 'users/' + id + '/promote', {
      headers: this.getAdminHeaders()
    });
  }

  login(trigram: string, password: string): Observable<any> {
    let formData = new FormData();
    formData.append('login', trigram);
    formData.append('password', password);
    return this.http.post(this.API_BASE_URL + 'admin/', formData);
  }

  deactivateUser(id: number): Observable<any> {
    // TODO: fix in back i think
    return this.http.delete(this.API_BASE_URL + 'users/' + id);
  }

  // ------------------------- USERS
  getUser(id: number): Observable<Player> {
    return this.http.get(this.API_BASE_URL + 'users/' + id).map(res => {
      return new Player(res);
    });
  }

  getAllUsers(): Observable<Player[]> {
    return this.http.get(this.API_BASE_URL + 'users').map((res: any[]) => {
      return res.map(pl => {
        return new Player(pl);
      });
    });
  }

  createUser(trigram: string, pseudo: string): Observable<any> {
    let formData = new FormData();
    formData.append('trigram', trigram);
    formData.append('pseudo', pseudo);
    return this.http.post(this.API_BASE_URL + 'users', formData);
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

    return this.http.put(this.API_BASE_URL + 'users/' + user.id, formData);
  }

  getUserCustomStats(userId: number): Observable<any> {
    return this.http.get(this.API_BASE_URL + 'users/' + userId + '/user_stats');
  }

  getUserMatchStats(userId: number): Observable<any> {
    return this.http.get(this.API_BASE_URL + 'users/' + userId + '/match_stats');
  }

  // ------------------------- MATCHES

  getMatch(id: number): Observable<Match> {
    return this.http.get(this.API_BASE_URL + 'matches/' + id).map((res: any[]) => {
      ['b', 'r'].forEach(t => {
        [1, 2, 3, 4, 5, 6].forEach(i => {
          res[t + i]['statistics'] = res[t + i + '_stats'];
          delete res[t + i + '_stats'];
        });
      });
      return new Match(res);
    });
  }

  getMatches(): Observable<Match[]> {
    return this.http.get(this.API_BASE_URL + 'matches').map((res: any[]) => {
      return res.map(m => {
        return new Match(m);
      });
    });
  }

  getUserMatches(userId): Observable<Match[]> {
    return this.http.get(this.API_BASE_URL + 'users/' + userId + '/matches').map((res: any[]) => {
      return res.map(m => {
        return new Match(m);
      });
    });
  }

  getPendingMatches(): Observable<PendingMatch[]> {
    return this.http.get(this.API_BASE_URL + 'matches/pending').map((res: any[]) => {
      return res.map(m => {
        return new PendingMatch(m);
      });
    });
  }

  getPendingMatch(id: number): Observable<PendingMatch> {
    return this.http
      .get(this.API_BASE_URL + 'matches/pending/' + id)
      .map(res => new PendingMatch(res));
  }

  deletePendingMatch(id: number): Observable<any> {
    return this.http.delete(this.API_BASE_URL + 'matches/pending/' + id, {
      headers: this.getAdminHeaders()
    });
  }

  confirmPendingMatch(id: number): Observable<any> {
    return this.http.put(
      this.API_BASE_URL + 'matches/pending/' + id,
      {},
      {
        headers: this.getAdminHeaders()
      }
    );
  }

  addPendingMatch(match, stats): Observable<any> {
    let matchFormData = new FormData();
    for (var k in match) {
      matchFormData.append(k, match[k]);
    }

    return this.http.post(this.API_BASE_URL + 'matches/pending', matchFormData, {}).map(
      res => {
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

          statRequests.push(
            this.http
              .post(this.API_BASE_URL + 'matches/pending/' + matchId + '/stats', statsFormData, {})
              .subscribe(res => {
                return res;
              })
          );
        });

        return Observable.forkJoin(statRequests);
      },
      err => {
        console.log(err);
      }
    );
  }

  // ------------------------- SEASONS

  getAllSeasons(): Observable<Season[]> {
    return this.http.get(this.API_BASE_URL + 'seasons').map((res: any[]) => {
      return res.map(m => {
        return new Season(m);
      });
    });
  }

  getSeason(id: number): Observable<Season> {
    return this.http.get(this.API_BASE_URL + 'seasons/' + id).map(res => new Season(res));
  }

  getCurrentSeason(): Observable<Season> {
    return this.http.get(this.API_BASE_URL + 'seasons/current').map(res => {
      return res['id'] != null ? new Season(res) : null;
    });
  }

  getSeasonMatches(id: number): Observable<Match[]> {
    return this.http.get(this.API_BASE_URL + 'seasons/' + id + '/matches').map((res: any[]) => {
      return res.map(m => {
        return new Match(m);
      });
    });
  }

  endSeason(id: number): Observable<any> {
    return this.http.delete(this.API_BASE_URL + 'seasons/' + id, {
      headers: this.getAdminHeaders()
    });
  }

  createSeason(name: string, maxMatches: any, maxTimeInSeconds: any): Observable<any> {
    let formData = new FormData();
    formData.append('name', name);
    if (maxTimeInSeconds) {
      formData.append('max_time', maxTimeInSeconds);
    }
    if (maxMatches) {
      formData.append('max_matches', maxMatches);
    }

    return this.http.post(this.API_BASE_URL + 'seasons', formData, {
      headers: this.getAdminHeaders()
    });
  }

  // ------------------------- ALGO
  runAlgo(algoName: string, playerIds: number[]): Observable<any> {
    let reqParams = new HttpParams();
    playerIds.forEach(id => {
      reqParams = reqParams.append('ids', id.toString());
    });
    return this.http.get(this.API_BASE_URL + 'algo/' + algoName, {
      params: reqParams
    });
  }

  getAlgoRanking(algoName: string, seasonId: number): Observable<AlgoRanking> {
    let reqParams = new HttpParams();
    if (seasonId) {
      reqParams = reqParams.append('season_id', seasonId.toString());
    }
    return this.http
      .get(this.API_BASE_URL + 'algo/' + algoName + '/users', {
        params: reqParams
      })
      .map(res => {
        return new AlgoRanking(res);
      });
  }

  getAlgoUserSeasonRankings(userId: number, algoName: string): Observable<any> {
    return this.http.get(this.API_BASE_URL + 'algo/' + algoName + '/users/' + userId);
  }

  getAlgoUserViz(userId: number, algoName: string, vizName: string): Observable<any> {
    return this.http.get(
      this.API_BASE_URL + 'algo/' + algoName + '/users/' + userId + '/' + vizName
    );
  }

  // ------------------------- RANKINGS

  getSpecificRanking(stat, method, seasonId) {
    let formData = new FormData();
    formData.append('stat', stat);
    formData.append('method', method);
    if (seasonId) {
      formData.append('season_id', seasonId);
    }

    return this.http.post(this.API_BASE_URL + 'statistics/ranking', formData, {
      headers: this.getAdminHeaders()
    });
  }
  // ------------------------- PENALTIES
  getPenalties(seasonId: number = null): Observable<Penalty[]> {
    let reqParams = new HttpParams();
    if (seasonId) {
      reqParams = reqParams.append('season_id', seasonId.toString());
    }
    return this.http
      .get(this.API_BASE_URL + 'penalties', { params: reqParams })
      .map((res: any[]) => {
        return res.map(pen => {
          return new Penalty(pen);
        });
      });
  }

  postPenalty(userId: number, seasonId: number, desc: string, value: number) {
    let formData = new FormData();
    formData.append('user_id', userId.toString());
    formData.append('season_id', seasonId.toString());
    formData.append('description', desc);
    formData.append('value', value.toString());
    return this.http.post(this.API_BASE_URL + 'penalties', formData, {
      headers: this.getAdminHeaders()
    });
  }

  // ------------------------- IOT
  pingIOT() {
    return this.http.get(this.API_BASE_URL + 'iot');
  }
}
