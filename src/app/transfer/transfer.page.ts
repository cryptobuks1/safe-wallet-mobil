import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BalanceService } from '../services/balance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TransferService } from '../services/transfer.service';
import { DirectoryService } from '../services/directory.service';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
    selector: 'app-transfer',
    templateUrl: './transfer.page.html',
    styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit, OnDestroy {

    balance: any;
    balanceSubscription: Subscription;
    codeSubscription: Subscription;
    formRegister: FormGroup;

    beneficiary: any;
    user: any;
    laoding: boolean;

    constructor(private fb: FormBuilder,
        private menu: MenuController,
        private router: Router,
        private alertController: AlertController,
        private authService: AuthService,
        private directoryService: DirectoryService,
        private transferService: TransferService,
        private serviceBalance: BalanceService) {
    }

    ngOnInit() {
        console.log('OnInit');
        this.laoding = true;
        this.user = this.authService.user;
        this.directoryService.select = null;
        this.directoryService.select.subscribe( data => {
            if( this.formRegister && data) {
                this.beneficiary = data;
                this.formRegister.get('code').setValue(data.code);
            }
        });
        this.balanceSubscription = this.serviceBalance.balance().subscribe((data: any) => {
            this.balance = data.data;
            this.balanceSubscription.unsubscribe();
            this.formRegister = this.fb.group({
                code: ['', [Validators.required]],
                amount: ['', [Validators.required, Validators.max(this.balance.balance) ]],
                commentary: ['', [Validators.required ]],
            });
            this.laoding = false;
        }, (error) => {
            this.balanceSubscription.unsubscribe();
            this.laoding = false;
        });
    }

    onSubmit() {
        if (this.formRegister.valid) {
            this.laoding = true;
            const value = this.formRegister.value;
            const sub = this.transferService.store(value).subscribe((data) => {
                this.laoding = false;
                sub.unsubscribe();
                this.transferOk( data.data.destination.amount, data.data.beneficiary);
            }, (error) => {
                this.laoding = false;
                sub.unsubscribe();
                if( error.error.errors.code){
                    this.formRegister.get('code').setErrors({ invalid: 'codigo invalido '});
                }
            });
        }
    }

    validateCode(){
        if( this.codeSubscription){
            this.codeSubscription.unsubscribe();
        }
        this.codeSubscription = this.transferService.validateCode( this.formRegister.get('code').value).subscribe((data) => {
            console.log('code',data);
            this.beneficiary = data.data;
        }, (error) => {
            this.beneficiary = null;
            if( error.code = 404){
                this.formRegister.get('code').setErrors({ invalid: 'codigo invalido '});
            }
        } );
    }

    async transferOk(amount, user) {
        const alert = await this.alertController.create({
            header: 'Transaccion Exitosa',
            message: 'Hemos realizado una trasnferencia por' + amount + ' a la cuenta de ' + user.name,
            buttons: [{
                text: 'Ok',
                handler: () => {
                    this.router.navigate(['home']);
                    /// go to home ;
                }
            }]
        });
        await alert.present();
    }

    onAddDirectory(){
        this.directoryService.add(this.beneficiary).subscribe(d => {
            this.directoryService.realodDirectory();
        })
    }

    onOpenDirectory(){
        this.menu.open('right');
    }

    errorCommentary() {
        return this.getErrors('commentary');
    }

    errorAmount() {
        return this.getErrors('amount');
    }

    errorCode() {
        return this.getErrors('code');
    }

    getErrors(name: string) {
        const field = this.formRegister.get(name);
        return field.invalid && (field.dirty || field.touched);
    }

    ngOnDestroy() {
         console.log('OnDestroy');
    }

}
 