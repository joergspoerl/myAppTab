import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
declare var google;

/**
 * Generated class for the GoogleMapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-google-maps',
  templateUrl: 'google-maps.html',
})
export class GoogleMapsPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  latLng: LatLng;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation) {

      this.latLng = navParams.get('latLng');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoogleMapsPage');

    if (this.latLng) {
      let latLng = new google.maps.LatLng(this.latLng);
      this.loadMap(latLng);
      this.setMarker(latLng);
    }
    else
        this.setLatLng();
  }

  setLatLng() {
    let latLng;
    this.geolocation.getCurrentPosition()

      .then((position) => {
        // use current geoposition
        latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.loadMap(latLng);
      })

      .catch((error) => {
        // default position, if no geolocation
        latLng = new google.maps.LatLng(51.0504088, 13.7372621); // dresden
        this.loadMap(latLng);
      })
  }

  loadMap(latLng) {

    
    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }


  setMarker(latLng) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });

  }

}


export interface LatLng  
{
  lat: number, 
  lng: number
};