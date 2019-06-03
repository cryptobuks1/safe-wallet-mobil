import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController} from '@ionic/angular';
import {AuthService} from '../auth.service';
import {Device} from '@ionic-native/device/ngx';
import {LoadingService} from '../../services/loading.service';
import {Router} from '@angular/router';
import {PasswordValidation} from '../../share/password-validation';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

    formRegister: FormGroup;
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

        this.formRegister = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), PasswordValidation]],
            password_confirmation: ['', [Validators.required, , Validators.minLength(6), PasswordValidation]],
        });

    }

    errorEmail() {
        return this.getErrors('email');
    }

    errorName() {
        return this.getErrors('name');
    }

    errorPassword() {
        return this.getErrors('password');
    }

    errorPasswordConfirmation() {
        return this.getErrors('password_confirmation');
    }

    getErrors(name: string) {
        const field = this.formRegister.get(name);
        return field.invalid && (field.dirty || field.touched);
    }

    onSubmit() {
        if (this.formRegister.valid) {
            this.loading.loading({
                message: 'Loading'
            }).then(load => {
                const values = this.formRegister.value;
                this.service.register(values).subscribe((data: any) => {
                    load.dismiss().then();
                    this.service.user = data.data;
                    this.router.navigateByUrl('/home').then(console.log);
                }, (error: any) => {
                    load.dismiss().then();
                    if (error.status === 422) {
                        if (error.error.errors.email) {
                            this.formRegister.get('email').setErrors({duplicate_email: true});
                        }
                    }
                });
            });

        }
    }
}
