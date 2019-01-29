import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
export function provideStorage() {
 return new Storage();
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
    defaultRate = 9.8385;

    defaultAppliances = [
    {
      name: 'Light Bulb',
      icon: 'bulb',
      wattage: 15,
      timeUsed: 0,
      status: false,
      lastUsed: null

    },
    {
      name: 'Electric Fan',
      icon: 'nuclear',
      wattage: 55,
      timeUsed: 0,
      status: false,
      lastUsed: null
    },
    {
      name: 'Rice cooker',
      icon: 'restaurant',
      wattage: 450,
      timeUsed: 0,
      status: false,
      lastUsed: null
    },
    {
      name: 'Television',
      icon: 'easel',
      wattage: 180,
      timeUsed: 0,
      status: false,
      lastUsed: null
    },
    {
      name: 'Refrigerator',
      icon: 'today',
      wattage: 300,
      timeUsed: 0,
      status: false,
      lastUsed: null
    }
  ];

  constructor(private router: Router, private storage: Storage) {
    storage.get('app_opened_before').then((result) => {
      if (result == false || result == null) {
        storage.set('Appliances', this.defaultAppliances).then((result) => {
          storage.set('app_opened_before', true);
          this.appliances = this.defaultAppliances;
          storage.set('Rate', this.defaultRate).then((result) => {
            this.computeBill();
          });
        });
      } else {
        storage.get('Appliances').then((result) => {
          this.appliances = result;
          console.table(result);
          this.computeBill();
        });
      }
    });
  }

  toggleAppliance(applianceIndex) {
    this.storage.get('Appliances').then((result) => {
      result[applianceIndex].status = !result[applianceIndex].status;
      if (result[applianceIndex].status == true) {
        result[applianceIndex].lastUsed = this.getCurrentDateTime();
      }
      this.storage.set('Appliances', result);
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
