import { All, AuthActionTypes } from "../actions/auth.actions";

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: any | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          Id: action.payload.user.userId,
          Name: action.payload.user.name,
          Token: action.payload.user.token,
          ExpirationDate: action.payload.user.expirationDate,
        },
        errorMessage: null,
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Usuário e/ou senha incorretos.',
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    case AuthActionTypes.LOAD_USER_DATA: {
      return state;
    }
    case AuthActionTypes.SET_IS_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: localStorage.getItem('token') ? true : false,
      };
    }
    default: {
      return state;
    }
  }
}
