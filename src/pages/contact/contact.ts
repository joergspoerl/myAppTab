import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactProvider, Contact } from '../../providers/contact/contact';
import { ContactDetailsPage } from '../contact-details/contact-details'
import { GoogleMapsPage } from '../google-maps/google-maps'
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contacts: any;

  constructor(
    public navCtrl: NavController,
    public contactProvider: ContactProvider,
    public toastCtrl: ToastController
  ) {

  }

  ionViewDidLoad() {
    this.getAllContacts();
  }

  getAllContactsStatic() {
    this.contactProvider.getAllContactsStatic().subscribe(

      result => {
        this.contacts = result.json();
        console.log("this.contacts", this.contacts)
      },

      error => {
        console.log("error", error)
      }
    )
  }

  ionViewDidEnter() {
    this.getAllContacts();
  }

  getAllContacts() {
    this.contactProvider.getAllContacts().then(

      result => {
        this.contacts = result.docs;
        console.log("this.contacts", this.contacts)
      },

      error => {
        console.log("error", error)
      }
    )
  }


  gotoContactDetails(contact) {
    this.navCtrl.push(ContactDetailsPage, { 'contact' : contact });
  }

  showMap() {
    var markers = [];
    for (let entry of this.contacts) {
      markers.push({ lat: entry.latitude, lng: entry.longitude})      
    }
    // for (var i = 1; i< 10; i++) {
    //   markers.push({ lat: this.contacts[i].latitude, lng: this.contacts[i].longitude})
    // }
    console.log("markers", markers)
    this.navCtrl.push(GoogleMapsPage, { 'latLngArray': markers });
  }

  showContactMap(contact) {
    this.navCtrl.push(GoogleMapsPage, { 'latLngArray' : [{ lat: contact.latitude, lng: contact.longitude}]});    
  }

  destroy() {
    console.log("test")
    this.contactProvider.destroy()
  }

  import() {
    console.log("test")
    this.contactProvider.createExampleContactDB();
  }

  sync() {
    console.log("sync")
    this.contactProvider.sync();
  }

  add() {
    console.log("add")
    this.navCtrl.push(ContactDetailsPage, { 'contact' : new Contact(), 'callback': this.reloadCallback });
  }

  reloadCallback () {
    return new Promise ((resolve, reject) => {
      this.getAllContacts();
      resolve();
    })
  }

}


