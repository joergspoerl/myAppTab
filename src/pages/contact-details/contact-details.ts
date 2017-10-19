import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMapsPage } from '../google-maps/google-maps'

/**
 * Generated class for the ContactDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html',
})
export class ContactDetailsPage {

  contact: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.contact = navParams.get('contact');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDetailsPage');
  }

  showMap(contact) {
    this.navCtrl.push(GoogleMapsPage, { 'latLng' : { lat: contact.latitude, lng: contact.longitude}});    
  }

}
