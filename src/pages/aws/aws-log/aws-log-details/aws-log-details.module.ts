import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwsLogDetailsPage } from './aws-log-details';

@NgModule({
  declarations: [
    AwsLogDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AwsLogDetailsPage),
  ],
})
export class AwsLogDetailsPageModule {}
