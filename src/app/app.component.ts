import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { DirectoryService } from './services/directory.service';
import { ToastService } from './services/toast.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

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
    directory: any[];

    constructor(private platform: Platform,
                private menu: MenuController,
                private route: Router,
                private toastService: ToastService,
                private loadingController: LoadingController,
                private service: AuthService,
                private directoryService: DirectoryService,
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

    onSelect(item){
        this.directoryService.select = item;
        this.menu.close('right');
    }

    ngOnInit(): void {
        this.service.userObservable().subscribe( ( data: any) => {
            this.user = data;
            this.directoryService.directory().subscribe( (data: any ) => {
                this.directory = data.data as any[];
            }, (error) => {
                console.log(error);
                this.toastService.error('error al tratar de cargar el directorio');
            });
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
