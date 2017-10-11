import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AwsLogPage } from './aws-log/aws-log';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AwsPage');
  }

  clickMenu(item) {
    console.log("clickMenu", item);
    this.navCtrl.push(item.page);    
  }

}
