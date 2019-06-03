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
        this.initializeApp();

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }


    ngOnInit(): void {

        this.service.userObservable().subscribe( ( data: any) => {
            console.log('------------->>>', data )
            this.user = data;
        });
        this.loadUser().then(user => {
            if (user) {
                this.route.navigateByUrl('/home').then();
            } else {
                this.route.navigateByUrl('/auth/login').then();
            }
        });
    }

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

}
