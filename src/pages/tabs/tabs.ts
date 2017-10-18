import { Component } from '@angular/core';

import { WeatherPage } from '../weather/weather/weather';
import { AwsPage } from '../aws/aws';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ChartPage } from '../chart/chart';

import { GoogleMapsPage } from '../google-maps/google-maps';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WeatherPage;
  tab2Root = AwsPage;
  tab3Root = AboutPage;
  tab4Root = ContactPage;
  tab5Root = ChartPage;
  tab6Root = GoogleMapsPage;

  constructor() {

  }
}
