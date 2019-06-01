import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_APPLIANCES, DEFAULT_RATE } from '../default-data';
import { DataService } from '../services/data.service';

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
  totalBill = '0.00';
  runningPowerRate = '0';
  runningBillRate = '0.00';
  runningAppliancesCount = 0;
  defaultAppliances = DEFAULT_APPLIANCES;
  defaultRate = DEFAULT_RATE;

  constructor(
      private router: Router,
      private storage: Storage,
      private dataService: DataService
    ) {
  }

  ngOnInit(){
    this.dataService.appliances.subscribe(appliances => {
      this.appliances = appliances;
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
      this.dataService.updateAppliances(this.appliances);
    });
  }

  computeBill() {
    let self = this;
    setInterval(function(){
      self.storage.get('Appliances').then((result) => {
        self.appliances = result;
        let totalPower = 0;
        let runningTotalWattage = 0;
        let runningAppliances = 0;
        for(let appliance of self.appliances) {
          if (appliance.status == true) {
            runningTotalWattage += parseInt(appliance.wattage);
            runningAppliances += 1;
          }
          totalPower += (parseInt(appliance.wattage) * (parseInt(appliance.timeUsed) / 3600)) / 1000;
        }
        self.storage.get('Rate').then((result) => {
          let rate = parseFloat(result);
          let runningKiloWatts = runningTotalWattage / 1000;
          self.totalBill = (totalPower * rate).toFixed(2);
          self.runningPowerRate = (runningKiloWatts).toFixed(2);
          self.runningBillRate = ((runningKiloWatts) * rate).toFixed(2);
          self.runningAppliancesCount = runningAppliances;
        });
      });
    }, 100);
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
