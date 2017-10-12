import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';

/*
  Generated class for the AwsMobilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AwsMobilProvider {

  baseUrl: string = 'https://aws.emilfrey.net/AwsMobile/';
  tokenUrl: string = 'token?SystemID=1';
  usr: string = 'Mobile';
  pwd: string = '!mobileCheck!';
  token: Token;

  awsRequestLog: AwsRequestLogEntry[];

  constructor(public http: Http) {
    console.log('Hello AwsMobilProvider Provider');
  }

 
  getToken() {
    console.log('getToken Start !');

    let body = 'username=' + this.usr + '&password=' + this.pwd + '&grant_type=password';
    let headers: Headers = new Headers({ 'Content-Type': ['application/x-www-form-urlencoded', 'application/json'] });

    return this.http.post(this.baseUrl + this.tokenUrl, body, { headers: headers })
  }

  getRequestLogWithAuth() {

    if (!this.token) {
      return this.getToken()
        .mergeMap(res => {
          this.token = res.json() as Token;
          return this.getRequestLog();
        })
    } else {
      return this.getRequestLog();
    }
  }


  getRequestLog() {

    let headers: Headers = new Headers(
      {
        'Content-Type': ['application/x-www-form-urlencoded', 'application/json'],
        'Authorization': 'bearer ' + this.token.access_token
      });

    return this.http.get(this.baseUrl + 'AwsMobileApi/GetRequestLog', { headers: headers })

  }


}

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AwsRequestLogEntry {

  "AWS_LOG_ID": number;
  "AWS_SESSION": string;
  "AWS_LOG_DATE": string;
  "AWS_LOG_RET_CODE": number;
  "AWS_LOG_SYS_ID": number;
  "AWS_LOG_REQ_ID": number;
  "AWS_LOG_CLIENT": string;
  "AWS_LOG_USER_ID": string;
  "REQ_NAME": string;
  "SYS_NAME": string;
  "COLOR": string;
}
