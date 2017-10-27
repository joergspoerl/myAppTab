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
  timer: any;
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
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter()")

    setTimeout( () => {
      this.getWeather();
    }, 200);

    this.timer = setInterval( () => {
      this.getWeather();
    }, 60000);

  }

  ionViewDidLeave() {
    console.log("ionViewDidLeave()")
    clearInterval(this.timer);
  }


  getWeather() {
    this.weatherProvider.getWeather().subscribe(weather => { console.log(weather); this.weather = weather })
  }

  gotoSettings() {
    this.navCtrl.push(wSettingsPage);    
  }
}
