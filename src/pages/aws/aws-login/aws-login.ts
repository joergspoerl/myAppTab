import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AwsAuthProvider } from '../../../providers/aws-auth/aws-auth';
import { Credentials } from '../../../providers/aws-auth/aws-auth';

/**
 * Generated class for the AwsLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aws-login',
  templateUrl: 'aws-login.html',
})
export class AwsLoginPage {


  credentials: Credentials = { username: '', password: ''};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private awsAuthProvider: AwsAuthProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AwsLoginPage');
    
    this.awsAuthProvider.getCredentials()
      .then(credentials => {
        this.credentials = credentials as Credentials
        console.log(this.credentials);
      });
  }

  login() {
    this.awsAuthProvider.setCredentials(this.credentials);
    this.navCtrl.pop();
  }


}
