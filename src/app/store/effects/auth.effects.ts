import { LoginInvalid} from './../actions/auth.actions';

import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  AuthActionTypes,
  LoadUserData,
  Login,
  LoginFailure,
  LoginSuccess,
} from '../actions/auth.actions';
import {
  UpdateImage,
  UpdateImageFailure,
  UpdateImageSucess,
} from '../actions/auth.actions';
import { AppState, selectAuthState } from '../app.states';
import { ToastService } from 'src/app/services/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable()
export class AuthEffects {
  getState: Observable<any>;
  username: any;
  password: any;

  constructor(
    private actions$: Actions,
    public authService: AuthenticationService,
    private router: Router,
    private toastService: ToastService,
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngrxOnInitEffects(): Action {
    return new LoadUserData();
  }

  forceLoginAction$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FORCE),
    map((action: Login) => action.payload),
    switchMap((payload) => {
      return this.authService.login(payload.username, payload.password).pipe(
        map((res) => {
          if (res.valid) {
            return new LoginSuccess({
              user: res.data,
            });
          } else {
            return new LoginFailure({ error: res.data.errors });
          }
        }),
        catchError((res) => {
          return of(new LoginFailure({ error: res.message }));
        })
      );
    })
  ));
  
  logInValide$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_INVALID),
    tap((payload) => {
    })
  ), { dispatch: false });
  
  login$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: Login) => action.payload),
    switchMap((payload) => {
      this.username = payload.username;
      this.password = payload.password;
      return this.authService.login(payload.username, payload.password).pipe(
        map((res) => {
          if (res.valid) {
            return new LoginSuccess({
              user: res.data,
            });
          } else {
            if (res.valid == false && res.data == false) {
              return new LoginInvalid({username: payload.username, password: payload.password})
            } else {
              return new LoginFailure({ error: res.data.errors });
            }
          }
        }),
        catchError((res) => {
          return of(new LoginFailure({ error: res.message }));
        })
      );
    })
  ));
  
  logInSuccess$: Observable<any> = createEffect(() => this.actions$.pipe(

    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((payload) => {
      this.router.navigateByUrl('/');
    })
  ), { dispatch: false });

  
  loginFailure$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap((action: any) => {
      console.log(action.payload);

      if (action.payload.error) {
        this.toastService.error(action.payload.error);
      }
    })
  ), { dispatch: false });

  
  logout$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
      window.location.reload()
      this.router.navigateByUrl('/auth/login');
    })
  ), { dispatch: false });

  
  loadUserData$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.LOAD_USER_DATA),
    tap((action) => {
      return;
    })
  ), { dispatch: false });

}
