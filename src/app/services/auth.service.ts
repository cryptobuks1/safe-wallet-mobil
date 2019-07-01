import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MySubject } from '../share/my-subject';
 
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loadUser = new MySubject();
    private _USER: any;

    constructor(private storage: Storage, private http: HttpClient) {

    }

    get user(): any {
        return this._USER;
    }

    set user(user: any) {
        this._USER = user;
        this.storage.set('app-token', this._USER).then();
        this.loadUser.next(this._USER);
    }

    get isAuthenticated() {
        return !!this._USER;
    }

    userObservable(): Observable<any> {
        return this.loadUser.asObservable();
    }

    async loadingUser() {
        this._USER = await this.storage.get('app-token');
        this.loadUser.next(this._USER);
        return this._USER;
    }

    login(value): Observable<any> {
        return this.http.post(environment.server + '/login', value);
    }

    logout(): Observable<any> {
        return this.http.delete(environment.server + '/logout');
    }

    async clear() {
        await this.storage.clear();
        this._USER = null;
        this.loadUser.next(this._USER);
    }

    register(values: any) {
        return this.http.post(environment.server + '/register', values);
    }
}
