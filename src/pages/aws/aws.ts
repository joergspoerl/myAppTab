import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AwsLogPage } from './aws-log/aws-log';
import { AwsLoginPage } from './aws-login/aws-login';
import { AwsAuthProvider } from '../../providers/aws-auth/aws-auth';

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
        { icon: 'list', name: 'Requests', page: AwsLogPage }
      ]
    },
    {
      name: 'Diagram',
      menu: [
        { icon: 'pie', name: 'Server', page: {} },
        { icon: 'pie', name: 'Client', page: {} },
      ]
    },
    {
      name: 'Configurtion',
      menu: [
        { icon: 'settings', name: 'App Settings', page: {} },
      ]
    },

  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private awsAuthProvider: AwsAuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AwsPage');
  }

  clickMenu(item) {
    console.log("clickMenu", item);
    this.navCtrl.push(item.page);    
  }

  showLogin() {
    this.navCtrl.push(AwsLoginPage);
  }

  logout() {
    this.awsAuthProvider.removeCredentials();
  }
  
  test() {
    this.awsAuthProvider.printTestToken();
  }

}
