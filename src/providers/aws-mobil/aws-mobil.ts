import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http/';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';


//import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage'
import { AwsLoginPage } from '../../pages/aws/aws-login/aws-login';
import { AuthProvider } from '../auth/auth';
import { Credentials } from '../auth/auth';

/*
  Generated class for the AwsMobilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AwsMobilProvider {

  baseUrl: string = 'https://aws.emilfrey.net/AwsMobile/';
  tokenUrl: string = 'token?SystemID=1';
  // usr: string = 'Mobile';
  // pwd: string = '!mobileCheck!';
  //token: Token;

  awsRequestLog: AwsRequestLogEntry[];

  credentials: Credentials = new Credentials();
  AwsCredentialsStoreKey: string = "AWS-Credentials";

  constructor(
    public http: Http,
    private httpClient: HttpClient,

    //public navCtrl: NavController, 
    //public navParams: NavParams,
    private AuthProvider: AuthProvider
  ) {
    console.log('Hello AwsMobilProvider Provider');
  }

  // getCredentials() {

  //   return new Promise((resolve, reject) => {
  //     this.AuthProvider.getCredentials().then()
  //   })

  //   // this.AuthProvider.getCredentials().then((credentials => {
  //   //   if ((credentials as Credentials).username != '') {
  //   //     this.credentials = credentials as Credentials;
  //   //   } else {
  //   //     this.credentials = {
  //   //       username: '!!!',
  //   //       password: '!!!'
  //   //     };
  //   //     //this.navCtrl.push(AwsLoginPage);
  //   //   }
  //   // }))
  // }



  // getRequestLogWithAuth() {

  //   if (!this.token) {
  //     return this.getToken()
  //       .mergeMap(res => {
  //         this.token = res.json() as Token;
  //         return this.getRequestLog();
  //       })
  //   } else {
  //     return this.getRequestLog();
  //   }
  // }


  getRequestLog() {

    return new Promise((resolve, reject) => {

      this.AuthProvider.getToken().then(result => {

        this.http.get(
          this.baseUrl + 'AwsMobileApi/GetRequestLog', { headers: this.AuthProvider.getAuthHeaders() })
          .toPromise()
          .then(response => resolve(response))
      })
    });
  }


  getRequestLog2() {

    return new Promise((resolve, reject) => {

      this.AuthProvider.getToken().then(result => {

        this.httpClient.get(
          this.baseUrl + 'AwsMobileApi/GetRequestLog')
          .toPromise()
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    });
  }



  getRequestLog3() {

    return this.httpClient.get(
      this.baseUrl + 'AwsMobileApi/GetRequestLog')
  }

  getServerCount() {
    return this.httpClient.get(
      this.baseUrl + 'AwsMobileApi/GetServerCount')
  }


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
