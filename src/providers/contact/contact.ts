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
    ) {
    console.log('Hello ContactProvider Provider');

    // init 
    PouchDB.plugin(find);
    this.initPouchDB();
  }

  initPouchDB() {
    this.db = new PouchDB('contacts');
    console.log("db", this.db);

    this.dbRemote = new PouchDB('https://contact:contact@jrg.deneb.uberspace.de/couchdb/contacts');
    console.log("dbRemote", this.dbRemote);
  }

  getAllContactsStatic() {
    return this.http.get('/assets/data/contact-600.json')
  }

  getAllContacts() {
    return this.db.find({
      selector: {
        type: 'contact-example'
      }
    })
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
    return this.db.sync(this.dbRemote);
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

  
  save(contact) {
    return this.db.put(contact)
  }

  remove(contact) {
    return this.db.remove(contact)
  }

  destroy() {
    return  this.db.destroy()    
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
      "latitude"= 50.327357 -  Math.random() 
      "longitude"= 13.131642 -  Math.random()
      "tags"= []
      "friends"= []
      "greeting"= ""
      "favoriteFruit"= ""

}