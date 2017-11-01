import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { LoadingProvider } from '../loading/loading'
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';

import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { LoggingProvider } from '../logging/logging'
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
  current: any;
  observer: any;
  timer: any;


  constructor(
    public http: Http,
    public log: LoggingProvider
  ) {
    console.log('Hello EllicoreProvider Provider');

    log.debug ("Hello EllicoreProvider Provider")
    //log.debug ()

    // init 
    PouchDB.plugin(find);
    this.initPouchDB();
  }


  initPouchDB() {
    const pouchOptions = {
      auto_compaction: true,
      revs_limit: 2
    }
    this.db = new PouchDB('ellicore-current', pouchOptions);
    console.log("db", this.db);

    this.dbRemote = new PouchDB('https://ellicore:ellicore@jrg.deneb.uberspace.de/couchdb/ellicore-current');
    console.log("dbRemote", this.dbRemote, pouchOptions);

    this.compact();
  }

  compact() {
    this.db.compact().then(
      ok => console.log("--> db compact !"),
      er => console.log("--> db compact ERROR !", er)
    );
    this.dbRemote.compact().then(
      ok => console.log("--> dbRemote compact !"),
      er => console.log("--> dbRemote compact ERROR !", er)
    );;
  }


  syncEvents() {
    var self = this;
    this.syncHandler = this.db.sync(this.dbRemote, {
      live: true,
      retry: true
    }).on('change', function (change) {
      // yo, something changed!
      console.log('==> change: ', change);
      //console.log('==> change docs: ', JSON.stringify(change));
      change.change.docs.forEach(item => {
        if (item._id == 'current') {
          self.current = item;
          console.log('current changed !', item);
          self.observer.next(item);
        }

      })
      //writeCurrent();
    }).on('paused', function (info) {
      // replication was paused, usually because of a lost connection
      console.log('==> paused: ', info);
    }).on('active', function (info) {
      // replication was resumed
      console.log('==> active: ', info);
    }).on('error', function (err) {
      // totally unhandled error (shouldn't happen)
      console.log('==> error: ', err);
    });

  }

  requestData() {

    this.db.get("controll").then(
      controll => {
        controll.request = "getnew";
        this.db.put(controll).then(
          ok => {
            console.log("====> REQUEST getnew !!")
          }
        )
      },
      error => {
        if (error.status == 404) {
          var controll_default = {
            _id: 'controll',
            request: 'getnew'
          }
          this.db.put(controll_default).then(
            ok => {
              console.log("====> REQUEST getnew !!")
            })
        }
        console.log("====> REQUEST ", error);
      }
    )
  }

  initTimer() {
    this.timer = setInterval(() => {
      this.requestData();
    }, 10000);
  }


  data() {

    this.syncEvents();
    this.initTimer();

    return Observable.create(observer => {
      this.observer = observer;
      return () => {
        // unsubscribe function
        console.log("==> unsubscribe data")
        clearTimeout(this.timer)
        this.syncHandler.cancel()
      }
    })
  }

}
