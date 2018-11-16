import { Action } from '@ngrx/store';
import { Post } from 'src/app/core/models/post.model';
import { ContactSearchResult } from 'src/app/contacts/models/contact-search.model';

export enum PostActionTypes {
    GetPostBeginType = '[Post] get Post begin',
    GetPostSuccessType = '[Post] get Post success',
    GetPostErrorType = '[Post] get Post ERROR',

    GetMyContactsPostsBeginType = '[Post] get mycontacts Posts begin',
    GetMyContactsPostsSuccessType = '[Post] get mycontacts Posts SUCCESS',
    GetMyContactsPostsErrorType = '[Post] get mycontacts Posts ERROR',

    CreateUpdatePostBeginType = '[Post] create or update begin',
    PostCancelType = '[Post] cancel',
    CreateUpdatePostSuccessType = '[Post] create or update success',
    PostErrorType = '[Post] create or updateERROR',

    SetPostToEditType = '[Post] set post to edit',
    NewPostRedirectType = '[Post] redirect to new post',
    DisplayConfirmDeleteType = '[Post] display delete confirm',
    DeletePostBeginType = '[Post] delete begin',
    DeletePostSuccessType = '[Post] delete success',
    DeletePostErrorType = '[Post] delete error',
    CancelConfirmType = '[Post] cancel confirm',

    HandleParallelContactsType = '[Post] handle contacts in parallel',
}

export class GetPostBegin implements Action {
    readonly type = PostActionTypes.GetPostBeginType;
}
export class GetPostSuccess implements Action {
    readonly type = PostActionTypes.GetPostSuccessType;
    constructor(public payload: { posts: Post[] }) { }
}
export class GetPostError implements Action {
    readonly type = PostActionTypes.GetPostErrorType;
    constructor(public payload: { error: Error }) { }
}

/**
 * Fetches all the posts of all my contacts
 */
export class GetMyContactsPostsBegin implements Action {
    readonly type = PostActionTypes.GetMyContactsPostsBeginType;
}
export class GetMyContactsPostsSuccess implements Action {
    readonly type = PostActionTypes.GetMyContactsPostsSuccessType;
    constructor(public payload: { mycontactsPosts: Post[] }) { }
}
export class GetMyContactsPostsError implements Action {
    readonly type = PostActionTypes.GetMyContactsPostsErrorType;
    constructor(public payload: { error: Error }) { }
}

export class HandleParallelContacts implements Action {
    readonly type = PostActionTypes.HandleParallelContactsType;
    constructor(public payload: { contacts: ContactSearchResult[] }) { }
}

export class NewPostRedirect implements Action {
    readonly type = PostActionTypes.NewPostRedirectType;
}
export class CreateUpdatePostBegin implements Action {
    readonly type = PostActionTypes.CreateUpdatePostBeginType;
    constructor(public payload: { post: Post }) { }
}
export class PostCancel implements Action {
    readonly type = PostActionTypes.PostCancelType;
}
export class CreateUpdatePostSuccess implements Action {
    readonly type = PostActionTypes.CreateUpdatePostSuccessType;
}
export class PostError implements Action {
    readonly type = PostActionTypes.PostErrorType;
    constructor(public payload: { error: Error }) { }
}

export class SetPostToEdit implements Action {
    readonly type = PostActionTypes.SetPostToEditType;
    constructor(public payload: { post: Post }) { }
}

export class DisplayConfirm implements Action {
    readonly type = PostActionTypes.DisplayConfirmDeleteType;
    constructor(public payload: { post: Post }) { }
}
export class CancelConfirm implements Action {
    readonly type = PostActionTypes.CancelConfirmType;
}
export class DeletePostBegin implements Action {
    readonly type = PostActionTypes.DeletePostBeginType;
    constructor(public payload: { id: string }) { }
}
export class DeletePostSuccess implements Action {
    readonly type = PostActionTypes.DeletePostSuccessType;
}
export class DeletePostError implements Action {
    readonly type = PostActionTypes.DeletePostErrorType;
    constructor(public payload: { error: Error }) { }
}

export type PostActions =
    GetPostBegin
    | GetPostSuccess
    | GetPostError

    | GetMyContactsPostsBegin
    | GetMyContactsPostsSuccess
    | GetMyContactsPostsError

    | HandleParallelContacts

    | CreateUpdatePostBegin
    | PostCancel
    | CreateUpdatePostSuccess
    | PostError

    | SetPostToEdit
    | DisplayConfirm
    | CancelConfirm
    | NewPostRedirect
    | DeletePostBegin
    | DeletePostSuccess
    | DeletePostError
    ;
