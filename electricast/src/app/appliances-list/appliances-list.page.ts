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
  title = 'Appliances List';
  totalPower = 0;
  appliances = [];

  powersUsed = [];
  timeUsedInHuman = [];

  constructor(private storage: Storage) {
    storage.get('Appliances').then((result) => {
      this.appliances = result;
      this.computePowers();
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
