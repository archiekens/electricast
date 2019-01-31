import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
export function provideStorage() {
 return new Storage(null);
}

@Component({
  selector: 'app-appliance-details',
  templateUrl: './appliance-details.page.html',
  styleUrls: ['./appliance-details.page.scss'],
  providers: [{provide: Storage, useFactory: provideStorage}]
})
export class ApplianceDetailsPage implements OnInit {
  title = 'Appliance Details';
  applianceIndex = 0;
  appliance = null;
  timeUsedInHuman = '';

  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    public toastController: ToastController) {
  }

  async presentToast(message, type) {
    const toast = await this.toastController.create({
      message: message,
      color: type,
      position: "top",
      animated: true,
      translucent: true,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.applianceIndex = parseInt(params.get("id"));
      this.storage.get('Appliances').then((result) => {
        this.appliance = result[this.applianceIndex];
        this.timeUsedInHuman = this.convertToHumanTime(this.appliance.timeUsed);
      });
    });
  }

  resetWattage() {
    this.storage.get('Appliances').then((result) => {
      this.appliance.wattage = result[this.applianceIndex].wattage;
    });
  }

  updateWattage() {
    let storage = this.storage;
    storage.get('Appliances').then((result) => {
      result[this.applianceIndex].wattage = this.appliance.wattage;
      storage.set('Appliances', result);
      this.presentToast('Updated successfully', "success");
    }).catch((error) => {
      this.presentToast('Update failed', "danger");
    });
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
