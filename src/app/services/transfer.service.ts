import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) {
  }

  /**
   * @description value { code, amount, commentary }
   * @param value 
   */
  store(value): Observable<any> {
    return this.http.post(environment.server + '/transfer', value);
  }

  /**
   * @description validate code belongs to user
   * @param code to transfer
   */
  validateCode(code: any): Observable<any> {
    return this.http.get(environment.server + '/transfer/validate-code', { params: { code } });
  }

}
