import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwsLogPage } from './aws-log';

@NgModule({
  declarations: [
    AwsLogPage,
  ],
  imports: [
    IonicPageModule.forChild(AwsLogPage),
  ],
})
export class AwsLogPageModule {}
