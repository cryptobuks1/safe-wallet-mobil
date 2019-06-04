import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    constructor(private http: HttpClient) {
    }

    transactions(): Observable<any> {
        return this.http.get(environment.server + '/transactions');
    }

}
