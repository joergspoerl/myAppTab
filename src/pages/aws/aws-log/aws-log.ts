import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AwsMobilProvider, AwsRequestLogEntry } from '../../../providers/aws-mobil/aws-mobil'
import { AwsLogDetailsPage } from './aws-log-details/aws-log-details';

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

  awsRequestLog: AwsRequestLogEntry[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private awsMobileProvider: AwsMobilProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AwsLogPage');
    this.awsMobileProvider.getRequestLog().then(response => {
      
      this.awsRequestLog = (response as Response).json() as AwsRequestLogEntry[];
    })
      
  }

  gotoAwsLogDetails(item) {
    this.navCtrl.push(AwsLogDetailsPage, { 'item' : item });
  }
}
