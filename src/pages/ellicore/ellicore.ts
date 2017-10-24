import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EllicoreProvider } from '../../providers/ellicore/ellicore'

/**
 * Generated class for the EllicorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ellicore',
  templateUrl: 'ellicore.html',
})
export class EllicorePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ellicoreProvider: EllicoreProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EllicorePage');
    this.sync();
  }

  sync() {
    console.log("sync start")
    this.ellicoreProvider.db.sync(this.ellicoreProvider.dbRemote).then(
      ok => {
        console.log("sync", ok);
        this.getCurrent();
      },

      error => {
        console.log("sync error", error);        
      }
    )
    
  }

  getCurrent () {
    this.ellicoreProvider.db.get('current').then(
      result => {
        console.log("current", result);
      },

      error => {}
    )

  }
}
