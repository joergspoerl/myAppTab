import { Component } from '@angular/core';

import { WeatherPage } from '../weather/weather/weather';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WeatherPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
