import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { wSettingsPage } from './wSettings';

@NgModule({
  declarations: [
    wSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(wSettingsPage),
  ],
})
export class SettingsPageModule {}
