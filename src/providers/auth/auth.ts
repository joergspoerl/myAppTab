import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http'; // Http - angular < 4.3
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  baseUrl: string = 'https://aws.emilfrey.net/AwsMobile/';
  tokenUrl: string = 'token?SystemID=1';
  
  token: Token;
  isAuthenticated: boolean;

  headers_prefix: string = 'bearer ';

  credentials: Credentials = new Credentials();
  credentialsStoreKey: string = "AWS-Credentials";

  constructor(
    public http: Http,
    private storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  getCredentials() {
    return new Promise((resolve, reject) => {
      this.storage.get(this.credentialsStoreKey).then((val => {
        if (val != null) {
          this.credentials = JSON.parse(val);
          this.login();
        } else {
          this.credentials = new Credentials();
        }
        resolve(this.credentials);
      }))
    });
  }

  setCredentials(newCredentials: Credentials) {
    this.credentials = newCredentials;
    if (this.credentials.remember)
      this.storage.set(this.credentialsStoreKey, JSON.stringify(this.credentials))
    console.log("setCredentials()", this.credentials);
  }

  removeCredentials() {
    this.credentials = new Credentials();
    this.storage.remove(this.credentialsStoreKey)
    console.log("removeCredentials()", this.credentials);
  }


  login() {
    console.log('getToken Start !', this.token);

    return new Promise((resolve, reject) => {

      // if token exist, use this
      if (this.isAuthenticated) {
        console.log("use saved token !")
        return resolve(this.token);
      }

      console.log("Login with: ", this.credentials)
      // prepair request
      let body = 'username=' + this.credentials.username
        + '&password=' + this.credentials.password + '&grant_type=password';
      let headers: Headers = new Headers({ 'Content-Type': ['application/x-www-form-urlencoded', 'application/json'] });

      //get token from server
      this.http.post(this.baseUrl + this.tokenUrl, body, { headers: headers })
        .subscribe(

        response => {
          this.token = response.json() as Token;
          console.log("getToken ->", this.token);
          this.isAuthenticated = true;
          return resolve(this.token);
        },

        error => {
          return reject(error);
        }
        )
    });

  }

  logout () {
    this.token = new Token();
    this.isAuthenticated = false;
  }

}






/************************************************************************************ 
 * 
 *  AuthHttpInterceptor
 * 
 ************************************************************************************/

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoadingProvider } from '../loading/loading'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(
    public authProvider: AuthProvider,
    public loadingProvider: LoadingProvider) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {


    this.loadingProvider.show();
    console.log("HttpHandler: ", next);
    const newRequest = req.clone({
      headers: req.headers.set(
        'Authorization',
        this.authProvider.headers_prefix + this.authProvider.token.access_token
      )
    });
    console.log("Interceptor inject TOKEN ", newRequest, next);
    return next.handle(newRequest)
      .do(event => {
        console.log('detecting event ', event);
        if (event instanceof HttpResponse) {
          console.log('detecting http response');
          this.loadingProvider.hide();
        }
      })
      .catch((error: any) => {
        console.log("ERROR", error);
        return Observable.throw(error);
      });
  }
}




/************************************************************************************ 
 * 
 *  Types
 * 
 ************************************************************************************/

export class Credentials {
  username: string;
  password: string;
  remember: boolean;

  constructor() {
    this.username = '';
    this.password = '';
    this.remember = true;
  }
}



export class Token {
  access_token: string;
  token_type: string;
  expires_in: number;

  constructor() {
    this.access_token = '';
    this.token_type = '';
    this.expires_in = 0;
  }
}

