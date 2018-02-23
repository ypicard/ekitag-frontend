import {
  Injectable
} from '@angular/core';
import 'rxjs/add/operator/map';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  CookieService
} from 'ng2-cookies';
import {
  Observable
} from 'rxjs/Observable';

@Injectable()
export class TagApiService {

  // BASE_URL = "https://ekitag-api.herokuapp.com/v1/"
  BASE_URL = "http://localhost:5000/v1/"

  constructor(private http: HttpClient, public cookieService: CookieService) {
    console.log('TagApiService');
  }

  // ------------------------- ADMIN
  isLoggedIn() {
    return this.cookieService.check('Bearer');
  }

  getAdminHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.cookieService.get('Bearer'));
    return headers;
  }

  promoteAdmin(id, password) {
    let formData = new FormData()
    formData.append('user_id', id)
    formData.append('password', password)

    return this.http.post(this.BASE_URL + 'users/' + id + '/promote', formData, {
      headers: this.getAdminHeaders()
    })
  }

  downgradeAdmin(id) {
    return this.http.delete(this.BASE_URL + 'users/' + id + '/promote', {
      headers: this.getAdminHeaders()
    })
  }

  login(trigram, password) {
    let formData = new FormData()
    formData.append('login', trigram)
    formData.append('password', password)
    return this.http.post(this.BASE_URL + 'admin/', formData);
  }

  deactivateUser(id) {
    // let formData = new FormData();
    // formData.append('user_id', id);

    // TODO: fix in back i think
    return this.http.delete(this.BASE_URL + 'users/' + id);
  }

  // ------------------------- USERS
  getUser(id) {
    return this.http.get(this.BASE_URL + 'users/' + id)
  }

  getAllUsers() {
    return this.http.get(this.BASE_URL + 'users')
  }

  createUser(trigram, pseudo) {
    let formData = new FormData();
    formData.append('trigram', trigram)
    formData.append('pseudo', pseudo)
    return this.http.post(this.BASE_URL + 'users', formData)
  }

  addPseudo(user, newPseudo) {
    if (user.usual_pseudos.indexOf(newPseudo < 0)) return; // No duplicate pseudo

    let formData = new FormData();
    formData.append('user_id', user.id)
    formData.append('pseudo', user.pseudo)
    user.usual_pseudos.forEach(pseudo => {
      formData.append('usual_pseudos', pseudo)
    })
    formData.append('usual_pseudos', newPseudo)

    return this.http.put(this.BASE_URL + 'users/' + user.id, formData)
  }

  // ------------------------- MATCHES

  getMatch(id) {
    return this.http.get(this.BASE_URL + 'matches/' + id)
  }

  getRecentMatches() {
    return this.http.get(this.BASE_URL + 'matches')
  }

  getMatchStats(id): Observable < Object > {
    // Used to be: getMatchStats(id): Observable<Object[]> {
    return this.http.get(this.BASE_URL + 'matches/' + id + '/stats');
  }

  getPendingMatches() {
    return this.http.get(this.BASE_URL + 'matches/pending');
  }

  getPendingMatch(id) {
    return this.http.get(this.BASE_URL + 'matches/pending/' + id);
  }

  deletePendingMatch(id) {
    return this.http.delete(this.BASE_URL + 'matches/pending/' + id, {
      headers: this.getAdminHeaders()
    });
  }

  confirmPendingMatch(id) {
    return this.http.put(this.BASE_URL + 'matches/pending/' + id, {}, {
      headers: this.getAdminHeaders()
    });
  }

  // ------------------------- SEASONS

  getAllSeasons() {
    return this.http.get(this.BASE_URL + 'seasons');
  }

  getSeason(id) {
    return this.http.get(this.BASE_URL + 'seasons/' + id);
  }

  getSeasonMatches(id) {
    return this.http.get(this.BASE_URL + 'seasons/' + id + '/matches');
  }

  endSeason(id) {
    return this.http.delete(this.BASE_URL + 'seasons/' + id, {
      headers: this.getAdminHeaders()
    });
  }

  createSeason(name, maxMatches, maxTime) {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('max_time', maxTime);
    formData.append('max_matches', maxMatches);
    return this.http.post(this.BASE_URL + 'seasons', formData, {
      headers: this.getAdminHeaders()
    });
  }

}
