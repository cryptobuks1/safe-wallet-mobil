import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AuthComponent} from './auth.component';
import {IonicStorageModule} from '@ionic/storage';
import {HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './register/register.component';

@NgModule({
    declarations: [AuthComponent, RegisterComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HttpClientModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        IonicStorageModule.forRoot(),
    ]
})
export class AuthModule {
}

