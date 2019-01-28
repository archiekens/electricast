import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
export function provideStorage() {
 return new Storage();
}

@Component({
  selector: 'app-appliances-list',
  templateUrl: './appliances-list.page.html',
  styleUrls: ['./appliances-list.page.scss'],
  providers: [{provide: Storage, useFactory: provideStorage}]
})
export class AppliancesListPage implements OnInit {

  objectKeys = Object.keys;
  title = 'Porn';
  totalPower = 0;
  appliances = [];

  defaultAppliances = [
    {
      name: 'Light Bulb',
      icon: 'bulb',
      wattage: 15,
      timeUsed: 21600,
      status: true,
      lastUsed: null

    },
    {
      name: 'Electric Fan',
      icon: 'nuclear',
      wattage: 55,
      timeUsed: 28800,
      status: true,
      lastUsed: null
    },
    {
      name: 'Rice cooker',
      icon: 'restaurant',
      wattage: 450,
      timeUsed: 1800,
      status: false,
      lastUsed: null
    },
    {
      name: 'Television',
      icon: 'easel',
      wattage: 180,
      timeUsed: 7200,
      status: false,
      lastUsed: null
    },
    {
      name: 'Refrigerator',
      icon: 'today',
      wattage: 300,
      timeUsed: 86400,
      status: true,
      lastUsed: null
    }
  ];

  powersUsed = [];
  timeUsedInHuman = [];
  defaultRate = 9.8385;

  constructor(private storage: Storage) {

    storage.get('app_opened_before').then((result) => {
      if (result == false || result == null) {
        storage.set('Appliances', this.defaultAppliances).then((result) => {
          storage.set('app_opened_before', true);
          this.appliances = this.defaultAppliances;
          this.computePowers();
        });
      } else {
        storage.get('Appliances').then((result) => {
          this.appliances = result;
          this.computePowers();
        });
      }

    });
  }

  ngOnInit() {
  }

  computePowers() {
    for(let appliance of this.appliances) {
      let powerUsed = (parseInt(appliance.wattage) * (parseInt(appliance.timeUsed) / 3600)) / 1000;
      this.powersUsed.push(powerUsed);
      this.timeUsedInHuman.push(this.convertToHumanTime(appliance.timeUsed));
      this.totalPower += powerUsed;
    }
  }

  toggleAppliance(applianceIndex) {
    /* Todo:
      If turned on:
        start timer
        set last used
      else 
        stop timer
      */
  }

  convertToHumanTime(seconds) {
    let time = '';

    if (seconds < 60) {
      time = seconds + ' seconds';
    } else if (seconds < 3600) {
      let minutes = Math.floor(seconds / 60);
      time = minutes + ' minutes';
    } else {
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds % 3600) / 60);
      time = hours + ' hours';
      time += minutes != 0 ? ' and ' + minutes + ' minutes' : '';
    }

    return time;
  }

}
