import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwsLoginPage } from './aws-login';

@NgModule({
  declarations: [
    AwsLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(AwsLoginPage),
  ],
})
export class AwsLoginPageModule {}
