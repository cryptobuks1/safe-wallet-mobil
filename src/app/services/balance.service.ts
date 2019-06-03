import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BalanceService {

    constructor(private http: HttpClient) {
    }


    /**
     *  @return {di, balance  } get balance
     */
    public balance(): Observable<any> {
        return this.http.get(environment.server + '/balance');
    }

    /**
     *  @param { amount } amount to increase balance
     */
    public increase({amount}): Observable<any> {
        return this.http.post(environment.server + '/balance', value);
    }


}
