import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AwsLogDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aws-log-details',
  templateUrl: 'aws-log-details.html',
})
export class AwsLogDetailsPage {

  item:any;
  itemIter:IterateOverObject;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');
    this.itemIter = new IterateOverObject(this.item);
    console.log(this.itemIter);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AwsLogDetailsPage');
  }

}

export class IterateOverObject {
  public arrayOfKeys;

  constructor(item) {
      this.arrayOfKeys = Object.keys(item);
  }
}
