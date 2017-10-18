import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http' //new
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import { WeatherPage } from '../pages/weather/weather/weather';
import { wSettingsPage } from '../pages/weather/wSettings/wSettings';

import { ChartPage } from '../pages/chart/chart';

import { AwsPage } from '../pages/aws/aws';
import { AwsLogPage } from '../pages/aws/aws-log/aws-log';
import { AwsLogDetailsPage } from '../pages/aws/aws-log/aws-log-details/aws-log-details';
import { AwsLoginPage } from '../pages/aws/aws-login/aws-login';

import { GoogleMapsPage } from '../pages/google-maps/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WeatherProvider } from '../pages/weather/providers/weather/weather';

import { AwsMobilProvider } from '../providers/aws-mobil/aws-mobil';

import { AuthHttpInterceptor } from '../providers/auth/auth';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthProvider } from '../providers/auth/auth';
import { LoadingProvider } from '../providers/loading/loading';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    WeatherPage,
    wSettingsPage,
    ChartPage,
    AwsPage,
    AwsLogPage,
    AwsLogDetailsPage,
    AwsLoginPage,
    GoogleMapsPage,
    TabsPage
    ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    WeatherPage,
    wSettingsPage,
    ChartPage,
    AwsPage,
    AwsLogPage,
    AwsLogDetailsPage,
    AwsLoginPage,
    GoogleMapsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WeatherProvider,
    AwsMobilProvider,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true},
    AuthProvider,
    AuthProvider,
    LoadingProvider,
    Geolocation
  ]
})
export class AppModule {}
