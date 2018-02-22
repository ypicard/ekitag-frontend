import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ng2-cookies';
import { Observable } from 'rxjs/Observable';
import {
    TagApiService
} from '../services/tag-api.service';

@Injectable()
export class AuthService {
    constructor(public cookieService: CookieService, private tagApiService: TagApiService){
        console.log('AuthService');
    }

    logout() {
        this.cookieService.delete('Bearer');
    }

    isLoggedIn(){
        return this.cookieService.check('Bearer');
    }

    login(pseudo, password){
        return this.tagApiService.login(pseudo, password);
    }
}
