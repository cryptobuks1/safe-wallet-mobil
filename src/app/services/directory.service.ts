import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MySubject } from './my-subject';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

    _select: MySubject<any> = new MySubject();

	constructor(private http: HttpClient) {
	}

    get select(){
        return this._select.asObservable();
    }

    set select( item: any) {
        this._select.next(item);
    }

    directory(): Observable<any> {
    	console.log('tesssssss')
        return this.http.get(environment.server + '/directories');
    }

    add(value): Observable<any> {
        return this.http.post(environment.server + '/directories',value);
    }

    remove(id): Observable<any> {
        return this.http.delete(environment.server + '/directories', { params: {id} });
    }

}
