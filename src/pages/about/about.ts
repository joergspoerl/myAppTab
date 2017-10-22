import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http'; // Http - angular < 4.3
import PouchDB from 'pouchdb';

// declare global {
//   interface Window { cblite: any; }
// }

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  status: any;
  testUrl: string;

  constructor(
    public navCtrl: NavController,
    public http: Http
  ) {
    //    public myDataService: MyDataService

    this.testUrl = 'https://couchdb.jrg.deneb.uberspace.de/'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage window', window);

  }


  dummy () {
    console.log("dummy start -->", this.testUrl);

    let options = new RequestOptions({ withCredentials: true });
    this.http.get(this.testUrl, options).subscribe(
      
      result => {
        console.log("result: ", JSON.stringify(result))
      },
    
      error => {
        console.log("error: ",  JSON.stringify(error))
        
      }
    )

  }

  testPouchDB() {
    var db = new PouchDB('kittens');
    console.log("db",db);

    var dbRemote = new PouchDB('https://couchdb.jrg.deneb.uberspace.de/kittens');
    console.log("dbRemote",dbRemote);

    var dbRemote2 = new PouchDB('http://127.0.0.1:5984/kittens');
    console.log("dbRemote2",dbRemote2);

    db.info().then(function (info) {
      console.log(info);
    })

    dbRemote.info().then(function (info) {
      console.log(info);
    })

    dbRemote2.info().then(function (info) {
      console.log(info);
    })


    var doc = {
      "_id": "mittens",
      "name": "Mittens",
      "occupation": "kitten",
      "age": 3,
      "hobbies": [
        "playing with balls of yarn",
        "chasing laser pointers",
        "lookin' hella cute"
      ]
    };
    db.put(doc);

    db.sync(dbRemote);
    db.sync(dbRemote2);
    
  }


}
