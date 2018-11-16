import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PostState } from './post.reducer';
import { getUserId } from 'src/app/auth-blockstack/auth.selectors';

export const POST_FEATURE_STATE_NAME = 'post';

export const selectState = createFeatureSelector<PostState>(POST_FEATURE_STATE_NAME);

export const getPost = createSelector(
    selectState,
    (state: PostState) => state.posts
);

/**
 * combines my posts and my contacts posts
 */
export const getAllPosts = createSelector(
    selectState,
    getUserId,
    (state: PostState, userId: string) => {
        const result = state.posts.concat(state.mycontactsPosts).map(x => {
            x.isMine = x.authorId === userId;
            return x;
        });
        console.log('getAllPosts selectors', state.posts, state.mycontactsPosts);
        console.log('getAllPosts selectors result', result);
        return result;
    }
);

export const getPostToEdit = createSelector(
    selectState,
    (state: PostState) => {
        return state.postToEdit;
    }
);

export const getPostToDelete = createSelector(
    selectState,
    (state: PostState) => state.postToDelete
);

export const isEditMode = createSelector(
    selectState,
    (state: PostState) => state && state.postToEdit !== null
);

export const isPending = createSelector(
    selectState,
    (state: PostState) => state.pending
);

export const displayConfirmDelete = createSelector(
    selectState,
    (state: PostState) => state && state.displayConfirm
);
