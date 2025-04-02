
import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface State {
    authenticated: boolean;
    authToken: string | null;
}

const token = localStorage.getItem('token');

const initialState: State = {
    authenticated: token !== null,
    authToken: token ? token : null,
};

const _authReducer = createReducer(
    initialState,
    on(AuthActions.signIn, (state) => ({
        ...state,
        authenticated: true,
    })),
    on(AuthActions.signUp, (state) => ({
        ...state,
        authenticated: true,
    })),
    on(AuthActions.logout, (state) => ({
        ...state,
        authenticated: false,
        authToken: null,
    })),
    on(AuthActions.setToken, (state, { token }) => ({
        ...state,
        authToken: token,
    })),
    on(AuthActions.signUpSuccess, (state, { access_token }) => ({
        ...state,
        authToken: access_token
        // Aquí puedes manejar el payload del signup success si es necesario
       
    }))
);

export function authReducer(state: State | undefined, action: Action) {
    return _authReducer(state, action);
}
