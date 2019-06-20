import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../services/balance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-transfer',
    templateUrl: './transfer.page.html',
    styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {

    balance: any;
    balanceSubscription: Subscription;
    formRegister: FormGroup;

    constructor(private fb: FormBuilder,
        private serviceBalance: BalanceService) {

        }

    ngOnInit() {

        this.balanceSubscription = this.serviceBalance.balance().subscribe((data: any) => {
            this.balance = data.data;

            this.formRegister = this.fb.group({
                code: ['', [Validators.required]],
                amount: ['', [Validators.required, Validators.min(0), Validators.max( this.balance.balance)]],
                commentary: ['', [Validators.required, Validators.minLength(9999),]],
            });
    
        }, (error) => {
            console.error(error);
        });
    }

}
