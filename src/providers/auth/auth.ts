import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http'; // Http - angular < 4.3
import 'rxjs/add/operator/map';

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
        } else {
          this.credentials = new Credentials();
        }
        resolve(this.credentials);
      }))
    });
  }

  setCredentials(newCredentials: Credentials) {
    this.credentials = newCredentials;
    this.storage.set(this.credentialsStoreKey, JSON.stringify(this.credentials))
    console.log("setCredentials()", this.credentials);
  }

  removeCredentials() {
    this.credentials = new Credentials();
    this.storage.remove(this.credentialsStoreKey)
    console.log("removeCredentials()", this.credentials);
  }


  getToken() {
    console.log('getToken Start !', this.token);

    return new Promise((resolve, reject) => {

      // if token exist, use this
      if (this.token) {
        console.log("use saved token !")
        return resolve(this.token);
      }

      // user & password from Storage
      this.getCredentials().then(result => {
        this.credentials = result as Credentials;

        // prepair request
        let body = 'username=' + this.credentials.username
          + '&password=' + this.credentials.password + '&grant_type=password';
        let headers: Headers = new Headers({ 'Content-Type': ['application/x-www-form-urlencoded', 'application/json'] });

        //get token from server
        this.http.post(this.baseUrl + this.tokenUrl, body, { headers: headers })
          .subscribe(response => {
            this.token = response.json() as Token;
            console.log("getToken ->", this.token);
            return resolve(this.token);
          })
      });

    })
  }


  printTestToken() {
    this.getToken().then(result => {
      console.log("printTestToken", result);
    })
  }

  getAuthHeaders() {
    let headers: Headers = new Headers(
      {
        'Content-Type': ['application/x-www-form-urlencoded', 'application/json'],
        'Authorization': 'bearer ' + this.token.access_token
      });
    return headers;
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


@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(public authProvider: AuthProvider) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {


    console.log("HttpHandler: ", next);
    const newRequest = req.clone({
      headers: req.headers.set(
        'Authorization',
        this.authProvider.headers_prefix + this.authProvider.token.access_token
      )
    });
    console.log("Interceptor inject TOKEN ", newRequest, next);
    return next.handle(newRequest);
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

  constructor() {
    this.username = '';
    this.password = '';
  }
}



export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
}

