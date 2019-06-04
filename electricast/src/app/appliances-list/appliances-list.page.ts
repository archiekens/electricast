import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddAppliancePage } from '../modals/add-appliance/add-appliance.page';
import { ICON_NAMES } from '../default-data';

import { Storage } from '@ionic/storage';
export function provideStorage() {
 return new Storage(null);
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

  constructor(
    private storage: Storage,
    public modalController: ModalController
    ) {
  }

  ngOnInit() {
    this.storage.get('Appliances').then((result) => {
      this.appliances = result;
      this.computePowers();
    });
  }

  async addAppliance() {
    const modal = await this.modalController.create({
      component: AddAppliancePage
    });
 
    modal.onDidDismiss().then((response) => {
      if (response.data !== false) {
        let appliance = {
          name: response.data.name,
          type: parseInt(response.data.type),
          wattage: response.data.wattage,
          timeUsed: 0,
          status: false,
          lastUsed: null,
          icon: ICON_NAMES[parseInt(response.data.type)]
        };

        this.storage.get('Appliances').then((result) => {
          this.appliances = result;
          this.appliances.push(appliance);
          this.storage.set('Appliances', this.appliances);
          this.computePowers();
        });
      }
    });
 
    return await modal.present();
  }

  computePowers() {
    for(let appliance of this.appliances) {
      let powerUsed = (parseInt(appliance.wattage) * (parseInt(appliance.timeUsed) / 3600)) / 1000;
      this.powersUsed.push(powerUsed.toFixed(2));
      this.timeUsedInHuman.push(this.convertToHumanTime(appliance.timeUsed));
      this.totalPower += powerUsed;
    }
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
