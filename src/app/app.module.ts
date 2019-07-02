import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';
import { InterceptorService } from './auth/interceptor.service';
import { ClipboardModule } from 'ngx-clipboard';
import { CacheModule } from 'ionic-cache';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        AppRoutingModule,
        BrowserModule,
        CacheModule.forRoot({keyPrefix: '@safe-cache'}),
        ClipboardModule,
        FormsModule,
        HttpClientModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        FormBuilder,
        Device,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
