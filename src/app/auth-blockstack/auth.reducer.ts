import { AuthActions, AuthActionTypes } from './auth.actions';

export interface AuthState {
    isAuthenticated: boolean;
    pending: boolean;
    blockstackId: string;
    username: string;

}

export const initialState: AuthState = {
    isAuthenticated: false,
    pending: false,
    blockstackId: null,
    username: null,
};

export function reducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {

        case AuthActionTypes.VerifyUserIsSignedInBeginType:
            return {
                ...state,
                pending: true,
            };
        case AuthActionTypes.UserIsSignedInType:
            return {
                ...state,
                isAuthenticated: true,
                pending: false,
            };
        case AuthActionTypes.LoadUserDataBeginType:
        case AuthActionTypes.RedirectToBlockstackSignInType:
            return {
                ...state,
                pending: true,
            };
        case AuthActionTypes.LoadUserDataSuccessType:
            return {
                ...state,
                pending: false,
                blockstackId: action.payload.data.username,
                username: action.payload.data.profile.name,
            };
        case AuthActionTypes.UserNotSignedType:
            return {
                ...state,
                isAuthenticated: false,
                pending: false,
            };

        default:
            return state;
    }
}
