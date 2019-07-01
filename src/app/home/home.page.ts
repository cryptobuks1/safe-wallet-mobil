import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {LoadingService} from '../services/loading.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {BalanceService} from '../services/balance.service';
import {PaymentService} from '../services/payment.service';
import {TransactionService} from '../services/transaction.service';
import {ClipboardService} from 'ngx-clipboard'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

    balance: any;
    balanceSubscription: Subscription;

    payments: any [];
    paymentsSubscription: Subscription;

    transactions: any [];
    transactionsSubscription: Subscription;

    user:any;

    constructor(private authService: AuthService,
                private _clipboardService: ClipboardService,
                private serviceBalance: BalanceService,
                private servicePayment: PaymentService,
                private serviceTransaction: TransactionService,
                private loading: LoadingService,
                private rotuer: Router) {
    }

    ngOnInit(): void {

        this.balanceSubscription = this.serviceBalance.balance().subscribe((data: any) => {
            this.balance = data.data;
        }, (error) => {
            console.error(error);
        });

        this.paymentsSubscription = this.servicePayment.payments().subscribe((data: any) => {
            this.payments = data;
        }, (error) => {
            console.error(error);
        });

        this.transactionsSubscription = this.serviceTransaction.transactions().subscribe((data: any) => {
            this.transactions = data;
        }, (error) => {
            console.error(error);
        });

        this.user = this.authService.user;
        console.log(this.user);

    }

    transfer() {

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

    goToTransferPage(){
        this.rotuer.navigateByUrl('/transfer').then();
    }

    onCopy(){
      this._clipboardService.copyFromContent(this.user.code)
    }

    ngOnDestroy(): void {
        this.balanceSubscription.unsubscribe();
        this.paymentsSubscription.unsubscribe();
        this.transactionsSubscription.unsubscribe();
    }

}
