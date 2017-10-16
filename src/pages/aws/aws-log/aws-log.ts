import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AwsMobilProvider, AwsRequestLogEntry } from '../../../providers/aws-mobil/aws-mobil'
import { AwsLogDetailsPage } from './aws-log-details/aws-log-details';
import { LoadingController } from 'ionic-angular';
import { Loading } from 'ionic-angular';

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
  loader: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private awsMobileProvider: AwsMobilProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AwsLogPage');    
    this.loadLog3();  
  }

  loadLog() {
    this.presentLoading();
    this.awsMobileProvider.getRequestLog2()
    .then(response => {
      this.dissmissLoading();
      this.awsRequestLog = response as AwsRequestLogEntry[];
    })
    .catch(error => {
      this.dissmissLoading();
      console.log("Error: ", error);
    })
  }

  loadLog3() {
    this.presentLoading();
    this.awsMobileProvider.getRequestLog3().subscribe(
      result => {
        this.dissmissLoading();
        this.awsRequestLog = result as AwsRequestLogEntry[];
        },
      error => {
        this.dissmissLoading();
      })
  }

  gotoAwsLogDetails(item) {
    this.navCtrl.push(AwsLogDetailsPage, { 'item' : item });
  }


  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
//      duration: 3000
    });
    this.loader.present();
  }

  dissmissLoading() {
    this.loader.dismiss();
  }
}
