import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/do';

@Injectable()
export class ErrorinterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).do(event => {}, err => {
            if (err instanceof HttpErrorResponse && err.status == 401) {
                localStorage.removeItem('currentUser');    
                this.router.navigate(['/login']);
            }
        });
    }
}