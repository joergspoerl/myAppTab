import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactProvider, Contact } from '../../providers/contact/contact';
import { ContactDetailsPage } from '../contact-details/contact-details'
import { GoogleMapsPage } from '../google-maps/google-maps'

import { LoadingProvider } from '../../providers/loading/loading'

import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  db: any;
  dbRemote: any;

  contacts: any;

  constructor(
    public navCtrl: NavController,
    public contactProvider: ContactProvider,
    public loading: LoadingProvider,
    public toastCtrl: ToastController
  ) {

        
  }

  ionViewDidLoad() {
    this.getAllContacts();
  }




  // getAllContactsStatic() {
  //   this.contactProvider.getAllContactsStatic().subscribe(

  //     result => {
  //       this.contacts = result.json();
  //       console.log("this.contacts", this.contacts)
  //     },

  //     error => {
  //       console.log("error", error)
  //     }
  //   )
  // }

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
    this.loading.show();
    this.contactProvider.destroy().then(
      ok => { 
        console.log(ok);
        this.contactProvider.initPouchDB();
        this.loading.hide();
        this.getAllContacts();
      },
      error => { 
        console.log(error)
        this.loading.hide();
      }
    )
}

  import() {
    console.log("test")
    this.contactProvider.createExampleContactDB();
  }


  add() {
    console.log("add")
    this.navCtrl.push(ContactDetailsPage, { 'contact' : new Contact() });
  }

  remove(contact) {
    this.loading.show();
    
    this.contactProvider.remove(contact).then(
      ok => {
        console.log("Remove is ended: ", ok);
        this.loading.hide();
  
        this.presentToast({
          message: 'Removed',
          duration: 3000,
          position: 'middle'
        });  
        
        this.getAllContacts()
      },
      error => {
        console.log("Remove Error: ", error);
        this.loading.hide();
      })
      
  }


sync() {
  console.log("Sync is startet");
  
  this.loading.show();
  
  this.contactProvider.sync().then(
    ok => {
      console.log("Sync is ended: ", ok);
      this.loading.hide();

      this.presentToast({
        message: 'Sync was successfully\n Read ' + ok.push.docs_read + ' -  Write ' + ok.push.docs_written  + '\n Read ' + + ok.pull.docs_read + ' - Write ' + ok.pull.docs_written ,
        duration: 10000,
        position: 'middle'
      });  
      
      this.getAllContacts()
    },
    error => {
      console.log("Sync Error: ", error);
      this.loading.hide();
    })
  }



  presentToast(init) {
    const toast = this.toastCtrl.create(init);
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}


