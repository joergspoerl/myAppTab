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

  timer: any;
  current: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ellicoreProvider: EllicoreProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EllicorePage');
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter()")
    this.syncEvents();
    this.initTimer();
  }

  syncEvents() {
    var self = this;
    this.ellicoreProvider.syncHandler = this.ellicoreProvider.db.sync(this.ellicoreProvider.dbRemote, {
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

    this.ellicoreProvider.db.get("controll").then(
      controll => {
        controll.request = "getnew";
        this.ellicoreProvider.db.put(controll).then(
          ok => {
            console.log("getnew !!")
          }
        )
      }
    )
  }

  initTimer() {
    this.timer = setInterval(() => {
      this.requestData();
    }, 10000);
  }


  ionViewDidLeave() {
    console.log("ionViewDidLeave()")

    this.ellicoreProvider.syncHandler.cancel();
    clearTimeout(this.timer);

  }


  getCurrent() {
    this.ellicoreProvider.db.get('current').then(
      result => {
        console.log("current", result);
        this.current = result;
      },

      error => { }
    )

  }
}
