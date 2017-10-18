import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';

/**
 * Generated class for the FilesystemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filesystem',
  templateUrl: 'filesystem.html',
})
export class FilesystemPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public file: File) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilesystemPage');
    console.log(this.file);
    console.log(this.file.externalRootDirectory);
    
  }

}
