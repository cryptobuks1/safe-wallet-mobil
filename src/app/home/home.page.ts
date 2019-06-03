import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {LoadingService} from '../services/loading.service';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {BalanceService} from '../services/balance.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    balance: any;
    balanceSubscription: Subscription;

    constructor(private authService: AuthService,
                private service: BalanceService,
                private loading: LoadingService,
                private rotuer: Router) {
    }

    ngOnInit(): void {

        this.balanceSubscription = this.service.balance().subscribe(data => {
            this.balance = data.data;
        }, () => {
        });

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
