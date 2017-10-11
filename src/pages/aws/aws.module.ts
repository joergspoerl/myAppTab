import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwsPage } from './aws';

@NgModule({
  declarations: [
    AwsPage,
  ],
  imports: [
    IonicPageModule.forChild(AwsPage),
  ],
})
export class AwsPageModule {}
