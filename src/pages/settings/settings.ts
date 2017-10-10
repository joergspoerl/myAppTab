import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Location } from '../../providers/weather/weather';

import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  city: string;
  state: string;
  location:Location;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private weatherProvider: WeatherProvider
  ) {
    weatherProvider.getLocation();
    this.location = weatherProvider.location;
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad SettingsPage');

  }

  save(form) {

    this.weatherProvider.setLocation(this.location);
    this.navCtrl.push(HomePage);
  }
}
