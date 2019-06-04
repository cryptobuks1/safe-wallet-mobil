import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor(private service: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const user: any = this.service.user;

        if (this.service.isAuthenticated) {
            req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + user.token.accessToken)});
        }

        if (!req.headers.has('Content-Type')) {
            req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
        }

        req = req.clone({headers: req.headers.set('Accept', 'application/json')});

        return next.handle(req).pipe(tap((data) => {
            console.log( data);
        }, (error) => {
            if (error.status === 401 && this.service.isAuthenticated) {
                console.log(' TOKEN ERROR ');
            }
        }));

    }
}



