import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { LoadingProvider } from '../loading/loading'
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';

import { ToastController } from 'ionic-angular';

/*
  Generated class for the ContactProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactProvider {

  db: any;
  dbRemote: any;

  constructor(
    public http: Http,
    public loading: LoadingProvider,
    public toastCtrl: ToastController
  ) {
    console.log('Hello ContactProvider Provider');

    // init 
    PouchDB.plugin(find);

    this.initPouchDB();
  }

  getAllContactsStatic() {
    return this.http.get('/assets/data/contact-600.json')
  }


  initPouchDB() {
    this.db = new PouchDB('kittens');
    console.log("db", this.db);

    this.dbRemote = new PouchDB('https://couchdb.jrg.deneb.uberspace.de/kittens');
    console.log("dbRemote", this.dbRemote);
  }

  getAllContacts() {
    return this.db.find({
      selector: {
        type: 'contact-example'
      }
    });
  }


  createExampleContactDB() {
    console.log("createExampleContactDB() start")

    this.loading.show();

    this.getAllContactsStatic().subscribe(

      result => {
        let dataSet = result.json();

        for (let contact of dataSet) {
          this.db.put(contact).then(
            result => {
              //console.log(result);
            },
            error => {
              //console.log(error);
            }
          )
        }
        this.loading.hide();
      },

      error => {
        console.log(error);
      })
  }

  sync() {
    console.log("Sync is startet");
    
    this.loading.show();
    
    this.db.sync(this.dbRemote).then(
      ok => {
        console.log("Sync is ended: ", ok);
        this.loading.hide();

        this.presentToast({
          message: 'Sync was successfully\n Read ' + ok.push.docs_read + ' -  Write ' + ok.push.docs_written  + '\n Read ' + + ok.pull.docs_read + ' - Write ' + ok.pull.docs_written ,
          duration: 10000,
          position: 'middle'
        });
        
      },
      error => {
        console.log("Sync Error: ", error);
        this.loading.hide();
        
      })
  }

  createIndexAllContacts() {
    this.loading.show();
    
    this.db.createIndex({
      index: {fields: ['type']}
    }).then(
      ok => {
        this.loading.hide();
      },
      error => {
        this.loading.hide();
      });
  }

  destroy() {
    this.loading.show();
    this.db.destroy().then(
      ok => { 
        console.log(ok);
        this.initPouchDB();
        this.loading.hide();
      },
      error => { 
        console.log(error)
        this.loading.hide();
      }
    )
  }

  save(contact) {
    return this.db.put(contact)
  }



  presentToast(init) {
    const toast = this.toastCtrl.create(init);
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  


}



export class Contact {

      "_id" = new Date().toISOString();
      "type"= "contact-example"
      "index"= 0
      "guid"= ""
      "isActive"= true
      "balance"= "0"
      "picture"= "http://placehold.it/32x32"
      "age"= 0
      "eyeColor"= ""
      "name"= ""
      "gender"= ""
      "company"= ""
      "email"= ""
      "phone"= ""
      "address"= ""
      "about"= ""
      "registered"= ""
      "latitude"= 50.327357
      "longitude"= 13.131642
      "tags"= []
      "friends"= []
      "greeting"= ""
      "favoriteFruit"= ""

}