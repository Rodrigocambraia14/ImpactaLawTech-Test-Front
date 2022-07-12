import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_FORCE = '[Auth] Login Force',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
  GET_USER_DETAILS = '[Auth] Get User Details',
  LOAD_USER_DATA = '[Auth] Load User Data',
  SET_IS_AUTHENTICATED = '[Auth] Set Is Authenticated',
  UPDATE_IMAGE = '[Auth] Update Image',
  UPDATE_IMAGE_SUCESS = '[Auth] Update Image Sucess',
  UPDATE_IMAGE_FAILURE = '[Auth] Update Image Failure',
  LOGIN_INVALID = '[Auth] Login Invalide',
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) { }
}

export class ForceLoginAction implements Action {
  readonly type = AuthActionTypes.LOGIN_FORCE;
  constructor(public payload: any) { }
}

export class LoginInvalid implements Action {
  readonly type = AuthActionTypes.LOGIN_INVALID;
  constructor(public payload: any) { }
}


export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) { }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class GetUserDetails implements Action {
  readonly type = AuthActionTypes.GET_USER_DETAILS;
  constructor(public payload: any) { }
}

export class LoadUserData implements Action {
  readonly type = AuthActionTypes.LOAD_USER_DATA;
  constructor() { }
}

export class SetIsAuthenticated implements Action {
  readonly type = AuthActionTypes.SET_IS_AUTHENTICATED;
  constructor() { }
}
export class UpdateImage implements Action {
  readonly type = AuthActionTypes.UPDATE_IMAGE;
  constructor(public payload: any) { }
}

export class UpdateImageSucess implements Action {
  readonly type = AuthActionTypes.UPDATE_IMAGE_SUCESS;
  constructor(public payload: any) { }
}

export class UpdateImageFailure implements Action {
  readonly type = AuthActionTypes.UPDATE_IMAGE_FAILURE;
  constructor(public payload: any) { }
}

export type All =
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | GetUserDetails
  | LoadUserData
  | SetIsAuthenticated
  | UpdateImage
  | UpdateImageSucess
  | UpdateImageFailure;
