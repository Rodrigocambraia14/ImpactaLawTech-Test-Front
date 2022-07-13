import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
  import { Observable, Observer } from 'rxjs';
  import { environment } from 'src/environments/environment';
import { StoreService } from '../services/store.service';
import { AppState } from '../store/app.states';
  
  
  @Injectable()
  export class HttpRequestInterceptor implements HttpInterceptor {
    token: any;
    id: any;
    tenantHost: any;
  
    private requests: HttpRequest<any>[] = [];
  
    removeRequest(req: HttpRequest<any>) {
      const i = this.requests.indexOf(req);
      if (i >= 0) {
        this.requests.splice(i, 1);
      }
    }
  
    constructor(
      private storeService: StoreService,
      private store: Store<AppState> 
    ) {}
  
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      this.storeService.getAuth().subscribe((auth) => {
        this.token = auth.user?.Token;
      });
  
      request = request.clone({
        setHeaders: {
          'Token': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });
  
      this.requests.push(request);
  
      return new Observable((observer: Observer<any>) => {
        const subscription = next.handle(request).subscribe(
          (event) => {
            if (event instanceof HttpResponse) {
              this.removeRequest(request);
              observer.next(event);
            }
          },
          (err) => {
            this.removeRequest(request);
            observer.error(err);
  
          },
          () => {
            this.removeRequest(request);
            observer.complete();
          }
        );
  
        return () => {
          this.removeRequest(request);
          subscription.unsubscribe();
        };
      });
    }
  }
  