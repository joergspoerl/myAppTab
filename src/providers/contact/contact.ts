import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ContactProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactProvider {

  constructor(
    public httpClient: HttpClient) {
    console.log('Hello ContactProvider Provider');
  }

  getAllContacts() {
    return this.httpClient.get('../assets/data/contact-300.json')
  }

}
