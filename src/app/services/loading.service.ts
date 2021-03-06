import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor(private loadingController: LoadingController) {
    }

    async loading({message}) {
        const loading = await this.loadingController.create({message, spinner: 'crescent'});
        await loading.present();
        return loading;
    }


}
