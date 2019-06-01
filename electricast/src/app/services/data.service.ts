import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DEFAULT_APPLIANCES, DEFAULT_RATE } from '../default-data';

export function provideStorage() {
 return new Storage(null);
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public appliances = new BehaviorSubject([]);

  objectKeys = Object.keys;
  defaultAppliances = DEFAULT_APPLIANCES;
  defaultRate = DEFAULT_RATE;
  localAppliances = [];

  constructor(
    private platform: Platform,
    private storage: Storage
  ) {
    this.platform.ready().then(() => {
      storage.get('app_opened_before').then((result) => {
        if (result == false || result == null) {
          storage.set('Appliances', this.defaultAppliances).then((result) => {
            storage.set('app_opened_before', true);
            this.updateAppliances(this.defaultAppliances);
            storage.set('Rate', this.defaultRate).then((result) => {
              this.startTimer();
            });
          });
        } else {
          storage.get('Appliances').then((result) => {
            this.updateAppliances(result);
            for(let key of this.objectKeys(this.localAppliances)) {
              if (this.localAppliances[key].status == true && this.localAppliances[key].lastUsed != null) {
                let now: any = new Date();
                let lastUsedDate: any = new Date(this.localAppliances[key].lastUsed);
                let missingTimeUsed: any = (now - lastUsedDate) / 1000;
                this.localAppliances[key].timeUsed += missingTimeUsed;
              }
            }
            storage.set('Appliances', this.localAppliances).then((result) => {
              this.startTimer();
            });
          });
        }
      });
      this.appliances.subscribe(appliances => {
        this.localAppliances = appliances;
      });
    });
  }

  startTimer() {
    let storage = this.storage;
    let self = this;
    setInterval(function() {
      storage.get('Appliances').then((result) => {
        let appliances = result;
        for(let key of self.objectKeys(appliances)) {
          if (appliances[key].status == true) {
            appliances[key].timeUsed += 1;
            appliances[key].lastUsed = self.getCurrentDateTime();
          }
        }
        storage.set('Appliances', appliances);
        self.updateAppliances(appliances);
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

  updateAppliances(appliances) {
    this.appliances.next(appliances);
  }

}
