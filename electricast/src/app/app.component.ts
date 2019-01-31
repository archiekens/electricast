import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { DEFAULT_APPLIANCES, DEFAULT_RATE } from './default-data'

import { Storage } from '@ionic/storage';
export function provideStorage() {
 return new Storage(null);
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [{provide: Storage, useFactory: provideStorage}]
})
export class AppComponent {

  defaultAppliances = DEFAULT_APPLIANCES;
  defaultRate = DEFAULT_RATE;
  appliances = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    let storage = this.storage;
    storage.get('app_opened_before').then((result) => {
      if (result == false || result == null) {
        storage.set('Appliances', this.defaultAppliances).then((result) => {
          storage.set('app_opened_before', true);
          this.appliances = this.defaultAppliances;
        });
      } else {
        storage.get('Appliances').then((result) => {
          this.appliances = result;
        });
      }
    });
  }
}
