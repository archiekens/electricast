import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
export function provideStorage() {
 return new Storage(null);
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [{provide: Storage, useFactory: provideStorage}]
})
export class HomePage {

  objectKeys = Object.keys;
  title = 'Dashboard';
  appliances = [];
  totalBill = 0;

  constructor(private router: Router, private storage: Storage) {
  }

  ngOnInit(){
    this.storage.get('Appliances').then((result) => {
      this.appliances = result;
      this.computeBill();
    });
  }

  toggleAppliance(applianceIndex) {
    let storage = this.storage;
    storage.get('Appliances').then((result) => {
      result[applianceIndex].status = !result[applianceIndex].status;
      if (result[applianceIndex].status == true) {
        result[applianceIndex].lastUsed = this.getCurrentDateTime();
      }
      storage.set('Appliances', result);
      this.appliances = result;
    });
  }

  computeBill() {
    let totalPower = 0;
    for(let appliance of this.appliances) {
      totalPower += (parseInt(appliance.wattage) * (parseInt(appliance.timeUsed) / 3600)) / 1000;
    }
    this.storage.get('Rate').then((result) => {
      this.totalBill = totalPower * parseInt(result);
    });
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
}
