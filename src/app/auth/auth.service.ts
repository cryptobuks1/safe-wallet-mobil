import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MySubject} from '../share/my-subject';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    credential: any;
    loadUser = new MySubject();

    constructor(private storage: Storage, private http: HttpClient) {

    }

    set user(user: any) {
        this.credential = user;
        this.storage.set('app-token', this.credential).then();
        this.loadUser.next(this.credential);
    }

    get isAuthenticated() {
        return !!this.credential;
    }

    userObservable(): Observable<any> {
        return this.loadUser.asObservable();
    }

    async loadingUser() {
        this.credential = await this.storage.get('app-token');
        this.loadUser.next(this.credential);
        return this.credential;
    }

    login(value): Observable<any> {
        return this.http.post(environment.server + '/login', value);
    }

    logout(): Observable<any> {
        return this.http.delete(environment.server + '/logout');
    }

    async clear() {
        await this.storage.clear();
        this.credential = null;
        this.loadUser.next(this.credential);
    }

    register(values: any) {
        return this.http.post(environment.server + '/register', values);
    }
}
