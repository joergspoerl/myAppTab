import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactProvider } from '../../providers/contact/contact'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contacts: any;

  constructor(
    public navCtrl: NavController,
    public contactProvider: ContactProvider) {

  }

  ionViewDidLoad() {
    this.getAllContacts();
  }

  getAllContacts() {
    this.contactProvider.getAllContacts().subscribe(

      result => {
        this.contacts = result;
        console.log("this.contacts", this.contacts)
      },

      error => {
        console.log("error", error)
      }
    )
  }
}
