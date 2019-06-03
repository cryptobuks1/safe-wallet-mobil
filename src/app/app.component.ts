import {Component, OnInit} from '@angular/core';

import {LoadingController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    user: any;
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'List',
            url: '/list',
            icon: 'list'
        }
    ];

    constructor(private platform: Platform,
                private route: Router,
                private loadingController: LoadingController,
                private service: AuthService,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar) {
        this.initializeApp().then();
    }

    async initializeApp() {
        await this.platform.ready();
        this.statusBar.styleDefault();
        this.user = await this.service.loadingUser();
        this.splashScreen.hide();
    }


    ngOnInit(): void {
        this.service.userObservable().subscribe( ( data: any) => {
            this.user = data;
        });
    }
    /*
    async loadUser() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
            spinner: 'crescent',
        });
        await loading.present();
        this.user = await this.service.loadingUser();
        await loading.dismiss();
        return this.user;
    }
    */
}
