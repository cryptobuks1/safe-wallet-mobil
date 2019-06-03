import {Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {LoadingService} from '../loading.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private authService: AuthService,
                private loading: LoadingService,
                private rotuer: Router) {
    }

    logout() {

        this.loading.loading({
            message: 'PROCESS'
        }).then(load => {
            this.authService.logout().subscribe(async () => {
                await this.clear();
                await load.dismiss();
            }, async () => {
                await this.clear();
                await load.dismiss();
            });
        });

    }

    async clear() {
        await this.authService.clear();
        await this.rotuer.navigateByUrl('/auth/login').then();
    }


}
