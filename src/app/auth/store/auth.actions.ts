
import { createAction, props } from '@ngrx/store';

export enum ActionType {
    SIGNIN = '[Auth] Sign In',
    SIGNUP = '[Auth] Sign Up',
    LOGOUT = '[Auth] Logout',
    SET_TOKEN = '[Auth] Set Token',
    SIGN_UP_SUCCESS = '[Auth] Sign Up Success',
}

// Acciones con y sin payload
export const signIn = createAction(ActionType.SIGNIN);
export const signUp = createAction(ActionType.SIGNUP);
export const logout = createAction(ActionType.LOGOUT);
export const setToken = createAction(ActionType.SET_TOKEN, props<{ token: string }>());
export const signUpSuccess = createAction(ActionType.SIGN_UP_SUCCESS, props<{ access_token: string }>());
