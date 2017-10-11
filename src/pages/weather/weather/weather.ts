import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../providers/weather/weather';
import { wSettingsPage } from '../wSettings/wSettings'

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage {
  weather: any;
  location: {
    city: string,
    state: string
  }

  constructor(
    public navCtrl: NavController,
    private weatherProvider: WeatherProvider) {

      this.location = {
        city: '',
        state: ''
      }
}

  ionViewWillEnter() {


    setTimeout( () => {
      this.getWeather();
    }, 200);

    setInterval( () => {
      this.getWeather();
    }, 60000);
  }

  getWeather() {
    this.weatherProvider.getWeather().subscribe(weather => { console.log(weather); this.weather = weather })
  }

  gotoSettings() {
    this.navCtrl.push(wSettingsPage);    
  }
}
