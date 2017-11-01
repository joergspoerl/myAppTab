import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as prettyjson from 'prettyjson';

/*
  Generated class for the LoggingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoggingProvider {

  constructor(public http: Http) {
    console.log('Hello LoggingProvider Provider');
  }


  debug(args) {
    var content = ''
    for (var i = 0, j = arguments.length; i < j; i++) {
      content += (prettyjson.render(arguments[i]) + '\r\n');
    }
    console.log(this.getDateTimeString(), ' ---> ', content)
  }

  getDateTimeString () {
    var myDate = new Date();
    var myDateString = 
        myDate.getFullYear() + '-' +
        ('0' + (myDate.getMonth()+1)).slice(-2) + '-' +
        ('0' + myDate.getDate()).slice(-2) + ' ' +
        ('0' + myDate.getHours()).slice(-2) + '-' +
        ('0' + myDate.getMinutes()).slice(-2) + '-' +
        ('0' + myDate.getSeconds()).slice(-2) 

    return myDateString;
        
}


}
