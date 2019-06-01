import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-appliance',
  templateUrl: './add-appliance.page.html',
  styleUrls: ['./add-appliance.page.scss'],
})
export class AddAppliancePage implements OnInit {

  appliance = {
    name: '',
    type: '1',
    wattage: ''
  };

  errorMessage = '';

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
  ) { }

  ngOnInit() {
  }

  async addActivity() {
    if (this.appliance.name.length === 0 || this.appliance.wattage.length === 0) {
      this.errorMessage = 'Appliance name and criteria is required.';
    } else {
      await this.modalController.dismiss(this.appliance);
    }
    
  }

  async closeModal() {
    await this.modalController.dismiss(false);
  }

}
