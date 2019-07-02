import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';
import { DirectoryService } from './services/directory.service';
import { ToastService } from './services/toast.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CacheService } from 'ionic-cache';

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
                private cache: CacheService,
                private menu: MenuController,
                private route: Router,
                private loadingController: LoadingController,
                private loadingService: LoadingService,
                private toastService: ToastService,
                private service: AuthService,
                private directoryService: DirectoryService,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar) {
        this.initializeApp().then();
        cache.setDefaultTTL(60 * 60);
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

    async onRemoveDirectory(item) {
        const message = 'cargando...';
        const loading = await this.loadingService.loading({message});
        await this.directoryService.remove(item.id).toPromise();
        await loading.dismiss();
    }

    ngOnInit(): void {
        this.directoryService.directory.subscribe( (data: any ) => {
            this.directory = data as any[];
            console.log( 'load directory', data)
        }, (error) => {
            console.log(error);
            this.toastService.error('error al tratar de cargar el directorio');
        });
        this.service.userObservable().subscribe( ( data: any) => {
            this.user = data;
            this.directoryService.realodDirectory();
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
