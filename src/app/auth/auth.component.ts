import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {Device} from '@ionic-native/device/ngx';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {LoadingService} from '../loading.service';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

    formLogin: FormGroup;
    typePassword: string;
    showCredentialsError: boolean;

    constructor(private fb: FormBuilder,
                private loadingController: LoadingController,
                private service: AuthService,
                private device: Device,
                private loading: LoadingService,
                private router: Router) {
    }

    ngOnInit() {
        this.typePassword = 'password';
        this.showCredentialsError = false;
        this.formLogin = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });

    }

    async onSubmit() {
        if (this.formLogin.valid) {
            this.loading.loading({
                message: 'Loading'
            }).then(load => {
                const value = this.formLogin.value;
                this.service.login(Object.assign(this.deviceData(), value)).subscribe(
                    (data: any) => {
                        load.dismiss().then();
                        this.service.user = data.data;
                        this.router.navigateByUrl('/home').then(console.log);
                    },
                    (error) => {
                        load.dismiss().then();
                        if (error.status === 401) {
                            this.showCredentialsError = true;
                            setTimeout(() => {
                                this.showCredentialsError = false;
                            }, 4000);
                        }
                        console.log('error');
                    }
                );
            });
        }
    }

    errorEmail() {
        return this.getErrors('email');
    }

    errorPassword() {
        return this.getErrors('password');
    }

    getErrors(name: string) {
        const field = this.formLogin.get(name);
        return field.invalid && (field.dirty || field.touched);
    }

    private deviceData() {
        return {
            uuid: this.device.uuid,
            model: this.device.model,
            platform: this.device.platform,
            version: this.device.version
        };
    }

}


