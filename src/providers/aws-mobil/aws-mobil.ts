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

  
  getRequestLog() {

    return this.httpClient.get(
      this.baseUrl + 'AwsMobileApi/GetRequestLog')
  }

  getServerCount() {
    return this.httpClient.get(
      this.baseUrl + 'AwsMobileApi/GetServerCount')
  }

  getClientsCount() {
    return this.httpClient.get(
      this.baseUrl + 'AwsMobileApi/GetClientsCount')
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
