import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { Credentials } from '../../../providers/auth/auth';

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


  credentials: Credentials = new Credentials();
  remember: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private AuthProvider: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AwsLoginPage');

    this.AuthProvider.getCredentials()
      .then(credentials => {
        this.credentials = credentials as Credentials
        console.log(this.credentials);
      })
      .catch(error => {
        console.log("Error: ", error);
      })
  
  }

  login() {
    this.AuthProvider.setCredentials(this.credentials);
    this.AuthProvider.login()
    .then()
    .catch();
    this.navCtrl.pop();
  }

  

}
