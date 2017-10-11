import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AwsMobilProvider } from '../../../providers/aws-mobil/aws-mobil'
/**
 * Generated class for the AwsLogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aws-log',
  templateUrl: 'aws-log.html',
})
export class AwsLogPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private awsMobileProvider: AwsMobilProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AwsLogPage');
    this.awsMobileProvider.getToken();
  }

}
