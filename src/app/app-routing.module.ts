import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        canActivate: [AuthGuard],
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule',
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'list',
        loadChildren: './list/list.module#ListPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'transfer',
        loadChildren: './transfer/transfer.module#TransferPageModule',
        canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
