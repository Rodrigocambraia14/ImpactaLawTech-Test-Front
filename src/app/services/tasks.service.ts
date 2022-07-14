import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService extends ApiService{
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    super(http);
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }
 
  list(userId?: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.get<any>(
      `${environment.apiUrl}/task/${userId == null ? 'list' : ('list?UserId=' + userId)}`,
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

  delete(id: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.put<any>(`${environment.apiUrl}/task/delete`, {
      Id: id,
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

  create(body: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.post<any>(`${environment.apiUrl}/task/create`, {
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
    return this.http.put<any>(`${environment.apiUrl}/task/update`, {
      Id: body.id,
      Name: body.name,
      Description: body.description,
      Priority: body.priority,
      Status: body.status,
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
}
