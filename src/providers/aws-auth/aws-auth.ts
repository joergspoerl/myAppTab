import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'

/*
  Generated class for the AwsAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AwsAuthProvider {

  baseUrl: string = 'https://aws.emilfrey.net/AwsMobile/';
  tokenUrl: string = 'token?SystemID=1';
  token: Token;

  credentials: Credentials = new Credentials();
  AwsCredentialsStoreKey: string = "AWS-Credentials";

  constructor(public http: Http, private storage: Storage) {
    console.log('Hello AwsAuthProvider Provider');

  }

  getCredentials() {
    return new Promise((resolve, reject) => {
      this.storage.get(this.AwsCredentialsStoreKey).then((val => {
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
    this.storage.set(this.AwsCredentialsStoreKey, JSON.stringify(this.credentials))
    console.log("setCredentials()", this.credentials);
  }

  removeCredentials() {
    this.credentials = new Credentials();
    this.storage.remove(this.AwsCredentialsStoreKey)
    console.log("removeCredentials()", this.credentials);
  }


  getToken() {
    console.log('getToken Start !', this.token);

    return new Promise((resolve, reject) => {
      
      // if token exist, use this
      if(this.token) {
        return resolve(this.token);
      }

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
