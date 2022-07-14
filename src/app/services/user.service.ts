import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService{
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    super(http);
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }
 
  list(): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.get<any>(
      `${environment.apiUrl}/user/list`,
      ).pipe(
        map((create: any) => {
          return create;
        }),
        catchError((err) => {
          console.error('err', err);
          return of(undefined);
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  get(userId: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.get<any>(
      `${environment.apiUrl}/user/get?UserId=${userId}`,
      ).pipe(
        map((create: any) => {
          return create;
        }),
        catchError((err) => {
          console.error('err', err);
          return of(undefined);
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  delete(userId: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.delete<any>(`${environment.apiUrl}/user/delete?UserId=${userId}`,)
    .pipe(
      map((create: any) => {
        return create;
      }),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );;
  }

  create(body: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.post<any>(`${environment.apiUrl}/user/create`, {
      Name: body.name,
      Description: body.description,
      Priority: body.priority,
      UserId:  body.userId,
    }).pipe(
      map((create: any) => {
        return create;
      }),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );;
  }

  update(body: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.put<any>(`${environment.apiUrl}/user/update`, {
      UserId: body.userId,
      Name: body.name,
      Email: body.email,
      Status: body.status,
    }).pipe(
      map((create: any) => {
        return create;
      }),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );;
  }

  changePassword(body: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.put<any>(`${environment.apiUrl}/user/change-password`, {
      UserId: body.userId,
      Password: body.password,
      NewPassword: body.newPassword
    }).pipe(
      map((create: any) => {
        return create;
      }),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );;
  }

  checkStatus(userId: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.get<any>(
      `${environment.apiUrl}/user/check-status?UserId=${userId}`,
      ).pipe(
        map((create: any) => {
          return create;
        }),
        catchError((err) => {
          console.error('err', err);
          return of(undefined);
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }
}
