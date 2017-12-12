import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ng2-cookies';

@Injectable()
export class TagApiService {

  BASE_URL = "https://ekitag-api.herokuapp.com/v1/"

  constructor(private http: HttpClient, public cookieService: CookieService) {
    console.log('TagApiService')
  }

  getAllUsers() {
    return this.http.get(this.BASE_URL + 'users')
  }

  getUser(id) {
    return this.http.get(this.BASE_URL + 'users/' + id)
  }

  createUser(trigram, pseudo) {
    let formData = new FormData();
    formData.append('trigram', trigram)
    formData.append('pseudo', pseudo)
    return this.http.post(this.BASE_URL + 'users', formData)
  }

  deactivateUser(id) {
    let formData = new FormData();
    formData.append('user_id', id)
    return this.http.delete(this.BASE_URL + 'users/' + id, formData)

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

  login(trigram, password) {
    let formData = new FormData()
    formData.append('login', trigram)
    formData.append('password', password)
    return this.http.post(this.BASE_URL + 'admin/', formData)
  }

  getRecentMatches() {
    return this.http.get(this.BASE_URL + 'matches')
  }

  getMatch(id) {
    return this.http.get(this.BASE_URL + 'matches/' + id)
  }

}
