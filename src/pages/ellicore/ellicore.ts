import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EllicoreProvider } from '../../providers/ellicore/ellicore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { DisposableFn } from '@angular/core/src/view';


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

  current$: Observable<any>;
  currentDispose: any;
  current: any;
  test: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public zone: NgZone,
    public ellicoreProvider: EllicoreProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EllicorePage');
    //this.testObserver();

    this.current$ = this.ellicoreProvider.data();
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter()");
    this.startObserver()
  }




  ionViewDidLeave() {
    console.log("ionViewDidLeave()")

    //this.ellicoreProvider.syncHandler.cancel();
    //clearTimeout(this.timer);

    this.currentDispose.unsubscribe();

  }



  startObserver() {
    this.currentDispose = this.current$.subscribe(
      current => {
        this.zone.run(() => {
          this.current = current;
          this.test = this.test + 1;
          console.log("****** subsribe: ", current)  
        })
      }
    )
  }
}
