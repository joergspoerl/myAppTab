import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage'
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {
  apiKey:string       = '7adc1ac92e3f4aa41df408ddabdac351';
  url:string          = 'http://api.openweathermap.org/data/2.5/weather?appid=' + this.apiKey + '&q=';
  location:Location;

  // sample = {
  //   "coord": { "lon": -0.13, "lat": 51.51 },
  //   "weather": [{ "id": 300, "main": "Drizzle", "description": "light intensity drizzle", "icon": "09d" }],
  //   "base": "stations",
  //   "main": {
  //     "temp": 280.32, "pressure": 1012, "humidity": 81,
  //     "temp_min": 279.15, "temp_max": 281.15
  //   },
  //   "visibility": 10000,
  //   "wind": { "speed": 4.1, "deg": 80 },
  //   "clouds": { "all": 90 },
  //   "dt": 1485789600,
  //   "sys": { "type": 1, "id": 5091, "message": 0.0103, "country": "GB", "sunrise": 1485762037, "sunset": 1485794875 },
  //   "id": 2643743, "name": "London", "cod": 200
  // };

  constructor(public http: Http, private storage:Storage) {
    console.log('Hello WeatherProvider Provider');
    this.location = { city: '', state: ''};
    this.getLocation();
  }

  getWeather() {
    return this.http.get(this.url + this.location.city + ',' + this.location.state)
      .map(res => res.json());
  }

  setLocation(location:Location) {
    this.location = location;
    this.storage.set('location', JSON.stringify(location))
    console.log("setLocation()", location);
  }

  getLocation() {
    this.storage.get('location').then((val => {
      if (val != null) {
        this.location = JSON.parse(val);
      } else {
        this.location = {
          city: 'Dresden',
          state: 'DE'
        }
      }
    }))
  }


}

// Own Type
export class Location {
  city: string;
  state: string;
}
