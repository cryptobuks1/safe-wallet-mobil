import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

 constructor(public toastController: ToastController) {}

  async info(message, duration = 2000) {
  	const position = 'top';
  	const color = 'primary';
    const toast = await this.toastController.create({ message, duration, position, color});
    await toast.present();
  }

  async error(message, duration = 2000) {
  	const position = 'top';
  	const color = 'danger';
    const toast = await this.toastController.create({ message, duration, position, color});
    await toast.present();
  }

}
