import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AwsLogPage } from './aws-log/aws-log';
import { AwsLoginPage } from './aws-login/aws-login';
import { AuthProvider } from '../../providers/auth/auth';
import { AwsMobilProvider } from '../../providers/aws-mobil/aws-mobil';
import { ChartPage } from '../chart/chart';

import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the AwsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aws',
  templateUrl: 'aws.html',
})
export class AwsPage {
  
  awsMenu: any = [
    {
      name: 'Log Files',
      menu: [
        { icon: 'list', name: 'Requests', page: AwsLogPage, param: {}}
      ]
    },
    {
      name: 'Diagram',
      menu: [
        { icon: 'pie', name: 'Server', page: ChartPage , param: this.awsMobileProvider.getServerCount()},
        { icon: 'pie', name: 'Client', page: ChartPage , param: this.awsMobileProvider.getClientsCount()},
      ]
    },
    {
      name: 'Configurtion',
      menu: [
        { icon: 'settings', name: 'App Settings', page: {},  param: {} },
      ]
    },

  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    public awsMobileProvider: AwsMobilProvider,
    public loadingProvider: LoadingProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AwsPage');

    // Login
    console.log("ionViewDidLoad");

    this.loadingProvider.show();
    this.authProvider.login()
    .then(
      result => {
        this.loadingProvider.hide();
      })
    .catch(
      error  => {
        this.loadingProvider.hide();
        this.showLogin();
      });
      
  }

  clickMenu(item) {
    console.log("clickMenu", item);
    this.navCtrl.push(item.page, { 'func' : item.param });    
  }

  showLogin() {
    this.navCtrl.push(AwsLoginPage);
  }

  logout() {
    this.authProvider.logout();
    this.navCtrl.push(AwsLoginPage);
  }
  


}
