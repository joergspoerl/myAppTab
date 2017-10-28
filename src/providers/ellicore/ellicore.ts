import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { LoadingProvider } from '../loading/loading'
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';

import { ToastController } from 'ionic-angular';

/*
  Generated class for the EllicoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EllicoreProvider {

  db: any;
  dbRemote: any;
  syncHandler: any;

  constructor(public http: Http) {
    console.log('Hello EllicoreProvider Provider');

        // init 
        PouchDB.plugin(find);
        this.initPouchDB();
  }


  initPouchDB() {
    this.db = new PouchDB('ellicore-current');
    console.log("db", this.db);

    this.dbRemote = new PouchDB('https://ellicore:ellicore@jrg.deneb.uberspace.de/couchdb/ellicore-current');
    console.log("dbRemote", this.dbRemote);
  }

}
