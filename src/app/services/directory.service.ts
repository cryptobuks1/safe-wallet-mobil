import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MySubject } from './my-subject';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
    
    _select: MySubject<any> = new MySubject();
    _directory: MySubject<any> = new MySubject();

	constructor(private http: HttpClient, private storage: Storage) {
	}

    get select(){
        return this._select.asObservable();
    }

    set select( item: any) {
        this._select.next(item);
    }

    get directory() {
        this._directory.asObservable();
    }

    loadDirectory(): Observable<any> {
        return this.http.get(environment.server + '/directories');
    }

    add(value): Observable<any> {
        return this.http.post(environment.server + '/directories',value);
    }

    async realodDirectory() {
        const directory = await this.storage.get('safe:@directory') as any[];
        this._directory.next(directory);
    }

    remove(id): Observable<any> {
        return this.http.delete(environment.server + '/directories', { params: {id} });
    }

}
