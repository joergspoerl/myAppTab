import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the AwsMobilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AwsMobilProvider {

  urlToken: string = 'https://aws.emilfrey.net/AwsMobile/token?SystemID=1';
  usr: string = 'Mobile';
  pwd: string = '!mobileCheck!';
  headers: Headers = new Headers ({ 'Content-Type': ['application/x-www-form-urlencoded', 'application/json']});

  constructor(public http: Http) {
    console.log('Hello AwsMobilProvider Provider');
  }

  getToken() {
    console.log('getToken Start !');
    
      //let headers = { 'Content-Type': ['application/x-www-form-urlencoded', 'application/json']};
      let body = 'username=' + this.usr + '&password=' + this.pwd +'&grant_type=password';
    

    //return 

    console.log("->");
    
    let token = this.http.post(this.urlToken, body, {headers: this.headers} )
      .toPromise()
      .then(data => console.log("Response: ", data), error => console.log("Response ERROR: ", error
    ));
  }

}
