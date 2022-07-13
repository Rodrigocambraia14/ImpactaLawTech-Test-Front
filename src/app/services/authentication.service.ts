import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';


type User = {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
} | null;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLoading$: Observable<boolean> | undefined;
  isLoadingSubject: BehaviorSubject<boolean> | undefined;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();

    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !localStorage.getItem('token') === null;
  }

  login(username: any, password: any) {
    this.isLoadingSubject!.next(true);
    return this.http.post<any>(
      `${environment.apiUrl}/user/login`,
      { username, password})
      .pipe(
        map((auth: any) => {
          return auth;
        }),
        catchError((err) => {
          console.error('err', err);
          return of(undefined);
        }),
        finalize(() => this.isLoadingSubject!.next(false))
      );
  }

  logout() {
    const url = '/auth/login';
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate([url]);
  }

  Register(request: any): Observable<any> {
    this.isLoadingSubject!.next(true);
    return this.http.post<any>(
      `${environment.apiUrl}/user/register`,
      request
    )
    .pipe(
      map((auth: any) => {
        return auth;
      }),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject!.next(false))
    );
  }

  requestPassword(request: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/Authentication/reset-password`,
       request
    );
  }

  recoverPassword(request: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/Authentication/recover-password`,
       request
    );
  }

  validateToken(request: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/Authentication/validateToken`,
       request
    );
  }

  changePassword(request: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/Authentication/changePassword`,
       request
    );
  }

}
