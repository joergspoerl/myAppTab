import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EllicorePage } from './ellicore';

@NgModule({
  declarations: [
    EllicorePage,
  ],
  imports: [
    IonicPageModule.forChild(EllicorePage),
  ],
})
export class EllicorePageModule {}
