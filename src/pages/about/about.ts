import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { List } from 'ionic-angular';
// import { MyDataService } from '../../services/my-data.service'
import { Couchbase, Database } from 'cordova-couchbase/core';
import { Http, Headers } from '@angular/http'; // Http - angular < 4.3

declare global {
  interface Window { cblite: any; }
}

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  status: any;
  couchbaseUrl: string;

  constructor(
    public navCtrl: NavController,
    public http: Http
  ) {
    //    public myDataService: MyDataService

    this.couchbaseUrl = 'http://lite.couchbase./'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage window', window);

    this.initCouchDB();
    //this.useCouchbase();
  }


  initCouchDB() {
    function log(status) { console.log(status); }

    var couchbaseUrl;

    log("Start Couchbase Init")
    console.log("Start Couchbase Init")
    if (window.cblite) {
      window.cblite.getURL(function (err, url) {
        if (err) {
          console.log("error launching Couchbase Lite: " + err);
          log("error launching Couchbase Lite: " + err)
        } else {
          console.log("Couchbase Lite running at " + url);
          log("Couchbase Lite running at " + url);
          couchbaseUrl = url;
        }
      });
    } else {
      console.log("error, Couchbase Lite plugin not found.")
      log("error, Couchbase Lite plugin not found.")
    }

    //this.couchbaseUrl = couchbaseUrl;

    console.log("end init this.couchbaseUrl", this.couchbaseUrl);

  }

  dummy () {
    console.log("dummy start -->", this.couchbaseUrl);

    this.http.get(this.couchbaseUrl).subscribe(
      
      result => {
        console.log("result: ", JSON.stringify(result))
      },
    
      error => {
        console.log("error: ",  JSON.stringify(error))
        
      }
    )

  }


  useCouchbase() {
    console.log("start useCouchbase");

    var a = new Couchbase();

    //(new Couchbase()).openDatabase("example-db")
    a.openDatabase("example-db")

    console.log("end useCouchbase");
    

    
    // (new Couchbase()).openDatabase("example-db").then(

      
    //   database => {
    //   // 'database' will be used with every future interaction with Couchbase
    //     console.log("database",Database);
      
    //     database.createDocument({ "type": "todo", "title": "Wash Car" }).then(
    //       result => {
    //       // Do something with the result
    //       console.log("result",result)
    //       }, 
    //       error => {
    //       console.error(error);
    //     });

    //   }, 
      
    //   error => {
    //   console.error(error);
    // });
  }


}
