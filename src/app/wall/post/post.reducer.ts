import { Action } from '@ngrx/store';
import { PostActions, PostActionTypes } from './post.actions';
import { Post } from 'src/app/core/models/post.model';

export interface PostState {
    posts: Array<Post>;
    mycontactsPosts: Array<Post>;
    error: Error;
    pending: boolean;
    displayConfirm: boolean;
    postToEdit: Post;
    postToDelete: Post;
}

export const initialState: PostState = {
    error: null,
    posts: new Array<Post>(),
    mycontactsPosts: new Array<Post>(),
    pending: false,
    displayConfirm: false,
    postToEdit: null,
    postToDelete: null,
};

export function reducer(state = initialState, action: PostActions): PostState {
    switch (action.type) {

        case PostActionTypes.GetPostErrorType:
            return {
                ...state,
                error: action.payload.error,
            };
        case PostActionTypes.GetPostBeginType:
            return {
                ...state,
                pending: true,
            };
        case PostActionTypes.GetPostSuccessType:
            return {
                ...state,
                pending: false,
                posts: action.payload.posts,
            };

        case PostActionTypes.GetMyContactsPostsBeginType:
            return {
                ...state,
                pending: true,
            };
        case PostActionTypes.GetMyContactsPostsSuccessType:
            return {
                ...state,
                pending: false,
                mycontactsPosts: action.payload.mycontactsPosts,
            };
        case PostActionTypes.GetMyContactsPostsErrorType:
            return {
                ...state,
                pending: false,
                error: action.payload.error,
            };

        case PostActionTypes.CreateUpdatePostBeginType:
            return {
                ...state,
                pending: true,
            };
        case PostActionTypes.NewPostRedirectType:
            return {
                ...state,
                pending: false,
                postToEdit: null, // edit mode is false
            };
        case PostActionTypes.CreateUpdatePostSuccessType:
            return {
                ...state,
                pending: false,
            };
        case PostActionTypes.PostErrorType:
            return {
                ...state,
                error: action.payload.error,
                pending: false,
            };

        case PostActionTypes.SetPostToEditType:
            return {
                ...state,
                postToEdit: action.payload.post,
                pending: false,
            };
        case PostActionTypes.DisplayConfirmDeleteType:
            return {
                ...state,
                postToDelete: action.payload.post,
                displayConfirm: true,
            };
        case PostActionTypes.CancelConfirmType:
            return {
                ...state,
                displayConfirm: false,
            };
        case PostActionTypes.DeletePostBeginType:
            return {
                ...state,
                pending: true,
            };
        case PostActionTypes.DeletePostSuccessType:
            const newNodes = state.posts.filter(n => n.id !== state.postToDelete.id);
            return {
                ...state,
                posts: newNodes,
                displayConfirm: false,
                pending: false,
            };
        case PostActionTypes.DeletePostErrorType:
            return {
                ...state,
                error: action.payload.error,
                pending: false,
            };

        default:
            return state;
    }
}

