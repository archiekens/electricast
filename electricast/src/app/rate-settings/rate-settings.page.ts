import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DEFAULT_RATE } from '../default-data';

import { Storage } from '@ionic/storage';
export function provideStorage() {
 return new Storage(null);
}


@Component({
  selector: 'app-rate-settings',
  templateUrl: './rate-settings.page.html',
  styleUrls: ['./rate-settings.page.scss'],
})
export class RateSettingsPage implements OnInit {
  rate = 0;
  defaultRate = DEFAULT_RATE;

  constructor(
    private storage: Storage, public toastController: ToastController) {
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
    this.resetRate();
  }

  useDefaultRate() {
    this.rate = this.defaultRate;
  }

  resetRate() {
    this.storage.get('Rate').then((result) => {
      this.rate = parseFloat(result);
    })
  }

  updateRate() {
    this.storage.set('Rate', this.rate).then((result) => {
      this.presentToast('Updated successfully', "dark");
    }).catch((error) => {
      this.presentToast('Update failed', "danger");
    });
  }

}
