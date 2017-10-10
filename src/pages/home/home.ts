import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather: any;
  location: {
    city: string,
    state: string
  }

  constructor(
    public navCtrl: NavController,
    private weatherProvider: WeatherProvider,
    private storage: Storage) {

      this.location = {
        city: '',
        state: ''
      }
}

  ionViewWillEnter() {

    this.storage.get('location').then((val) => {
      console.log("val", val);
      if (val != null) {
        this.location = JSON.parse(val);
      } else {
        this.location = {
          city: 'Dresden',
          state: 'DE'
        }
      }
    });

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
}
