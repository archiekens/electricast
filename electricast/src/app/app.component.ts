import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { DEFAULT_APPLIANCES, DEFAULT_RATE } from './default-data';

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

  objectKeys = Object.keys;
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
          storage.set('Rate', this.defaultRate).then((result) => {
            this.startTimer();
          });
        });
      } else {
        storage.get('Appliances').then((result) => {
          this.appliances = result;
          let tmp = [];
          storage.get('app_last_opened').then((result) => {
            let appLastOpened = new Date(result);
            let previousMonth = appLastOpened.getMonth();
            let currentDateTime = new Date(this.getCurrentDateTime());
            let currentMonth = currentDateTime.getMonth();
            if (currentMonth > previousMonth) {
              for(let key of this.objectKeys(this.appliances)) {
                let missingTimeUsed: any = 0;
                let now: any = new Date();
                let firstDayOfMonth: any = new Date(now.getFullYear(), now.getMonth(), 1);
                if (this.appliances[key].status == true && this.appliances[key].lastUsed != null) {
                  let lastUsedDate: any = new Date(this.appliances[key].lastUsed);
                  missingTimeUsed = (firstDayOfMonth - lastUsedDate) / 1000;
                }
                tmp[key] = this.appliances[key].timeUsed + missingTimeUsed;
                this.appliances[key].timeUsed = 0;
                this.appliances[key].lastUsed = this.getCurrentDateTimeString(firstDayOfMonth);
              }

              let totalPower = 0;
              let runningTotalWattage = 0;
              let lastMonthBill = '0';
              for(let key of this.objectKeys(tmp)) {
                totalPower += (parseInt(this.appliances[key].wattage) * (parseInt(tmp[key]) / 3600)) / 1000;
              }

              this.storage.get('Rate').then((result) => {
                let rate = parseFloat(result);
                let runningKiloWatts = runningTotalWattage / 1000;
                lastMonthBill = (totalPower * rate).toFixed(2);
                storage.set('last_month_bill', lastMonthBill);
              });
            }
            for(let key of this.objectKeys(this.appliances)) {
              if (this.appliances[key].status == true && this.appliances[key].lastUsed != null) {
                let now: any = new Date();
                let lastUsedDate: any = new Date(this.appliances[key].lastUsed);
                let missingTimeUsed: any = (now - lastUsedDate) / 1000;
                this.appliances[key].timeUsed += missingTimeUsed;
              }
            }
            storage.set('Appliances', this.appliances).then((result) => {
              this.startTimer();
            });
          });
        });
      }
    });
  }

  startTimer() {
    let storage = this.storage;
    let self = this;
    setInterval(function() {
      storage.get('Appliances').then((result) => {
        self.appliances = result;
        for(let key of self.objectKeys(self.appliances)) {
          if (self.appliances[key].status == true) {
            self.appliances[key].timeUsed += 1;
            self.appliances[key].lastUsed = self.getCurrentDateTime();
          }
        }
        storage.set('Appliances', self.appliances);
        storage.set('app_last_opened', self.getCurrentDateTime());
      });
    }, 1000);
  }

  getCurrentDateTime() {
    let now = new Date();
    return now.getFullYear() + '/' +
          (now.getMonth()+1) + '/' +
          now.getDate() + ' ' +
          now.getHours() + ':' +
          now.getMinutes() + ':' +
          now.getSeconds();
  }

  getCurrentDateTimeString(dateObject) {
    return dateObject.getFullYear() + '/' +
          (dateObject.getMonth()+1) + '/' +
          dateObject.getDate() + ' ' +
          dateObject.getHours() + ':' +
          dateObject.getMinutes() + ':' +
          dateObject.getSeconds();
  }
}
