import { Action } from '@ngrx/store';
import { UserData } from './models/user-data.model';

export enum AuthActionTypes {
    VerifyUserIsSignedInBeginType = '[Auth] verify user is signed begin',
    UserIsSignedInType = '[Auth] user is signed in',
    UserNotSignedType = '[Auth] user is NOT signed in',
    RedirectToBlockstackSignInType = '[Auth] redirecting to blockstack browser to to sign in',
    SignInStaysOnSamePageType = '[Auth] keep current url',
    UserAuthErrorType = '[Auth] error',

    LoadUserDataBeginType = '[Auth] load user data begin',
    LoadUserDataSuccessType = '[Auth] load user data success',
    SignOutBeginType = '[Auth] sign out begin',
}

export class VerifyUserIsSignedInBegin implements Action {
    readonly type = AuthActionTypes.VerifyUserIsSignedInBeginType;
}

export class UserIsSignedIn implements Action {
    readonly type = AuthActionTypes.UserIsSignedInType;
}

export class UserAuthError implements Action {
    readonly type = AuthActionTypes.UserAuthErrorType;
    constructor(public payload: { error: Error }) { }
}
export class UserNotSigned implements Action {
    readonly type = AuthActionTypes.UserNotSignedType;
}

export class RedirectToBlockstackSignIn implements Action {
    readonly type = AuthActionTypes.RedirectToBlockstackSignInType;
}
export class SignInStaysOnSamePage implements Action {
    readonly type = AuthActionTypes.SignInStaysOnSamePageType;
}

export class LoadUserDataBegin implements Action {
    readonly type = AuthActionTypes.LoadUserDataBeginType;
}

export class LoadUserDataSuccess implements Action {
    readonly type = AuthActionTypes.LoadUserDataSuccessType;
    constructor(public payload: { data: UserData }) { }
}

export class SignOutBegin implements Action {
    readonly type = AuthActionTypes.SignOutBeginType;
}

export type AuthActions =
    VerifyUserIsSignedInBegin
    | UserIsSignedIn
    | UserNotSigned
    | LoadUserDataBegin
    | LoadUserDataSuccess
    | RedirectToBlockstackSignIn
    | SignOutBegin
    | SignInStaysOnSamePage
    ;
