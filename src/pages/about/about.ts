import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { List } from 'ionic-angular';
// import { MyDataService } from '../../services/my-data.service'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
) {
  //    public myDataService: MyDataService
  }

}
