import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http'; // Http - angular < 4.3

declare global {
  interface Window { cblite: any; }
}

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


}
