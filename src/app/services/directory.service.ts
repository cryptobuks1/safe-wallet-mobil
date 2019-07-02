import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { MySubject } from './my-subject';
import { Storage } from '@ionic/storage';
import { CacheService } from 'ionic-cache';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

    _select: MySubject<any> = new MySubject();
    _directory: BehaviorSubject<any> = new BehaviorSubject([]);

    groupKey = '@safe-directory';

	constructor(private http: HttpClient, private storage: Storage, private cache: CacheService) {
    
    }

    get select(){
        return this._select.asObservable();
    }

    set select( item: any) {
        this._select.next(item);
    }

    get directory(): Observable<any> { 
        return this._directory.asObservable();
    }

    loadDirectory() {
        console.log('loca cache')
        const cacheKey = 'directory';
        const request = this.http.get(environment.server + '/directories');
        const sub = this.cache.loadFromObservable(cacheKey, request, this.groupKey, 60 * 5 ).subscribe((data: any) => {
            this._directory.next(data.data);
             sub.unsubscribe();
        });
    }

    add(value): Observable<any> {
        const request = this.http.post(environment.server + '/directories',value).pipe(share());
        request.subscribe(() => {
            this.cache.clearGroup(this.groupKey).then(()=>{
                this.realodDirectory();
            });
        });
        return request;
    }

    remove(id): Observable<any> {
        const request =  this.http.delete(environment.server + '/directories', { params: {id} }).pipe(share());
        request.subscribe(() => {
            console.log('Clear cache')
            this.cache.clearGroup(this.groupKey).then(()=>{
                this.realodDirectory();
            });
        });
        return request;
    }

    async realodDirectory() {
        this.loadDirectory();
    }

}
