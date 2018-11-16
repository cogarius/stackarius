import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    PostActionTypes, GetPostError, GetPostSuccess,
    CreateUpdatePostBegin, CreateUpdatePostSuccess,
    PostError, DeletePostBegin, DeletePostSuccess, DeletePostError,
    GetMyContactsPostsBegin, GetMyContactsPostsError, GetMyContactsPostsSuccess, HandleParallelContacts
} from './post.actions';
import { switchMap, map, catchError, tap, withLatestFrom, filter, mergeMap } from 'rxjs/operators';
import { PostService } from './post.service';
import { of, forkJoin } from 'rxjs';
import { FatalError } from 'src/app/error/error.actions';
import { Post } from 'src/app/core/models/post.model';
import { Back, Go } from 'src/app/store/navigation';
import { AppState, DataWasFetched } from 'src/app/store';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/auth-blockstack/auth.reducer';
import { GetMyContactsBegin, ContactsState } from 'src/app/contacts/store';
import { ContactSearchResult } from 'src/app/contacts/models/contact-search.model';

@Injectable()
export class PostEffects {

    constructor(private actions$: Actions,
        private service: PostService, private store$: Store<AppState>) { }

    @Effect()
    getPost$ = this.actions$
        .pipe(
            ofType(PostActionTypes.GetPostBeginType),
            switchMap(() => this.service.getMyPosts()
                .pipe(
                    tap(x => console.log('getMyPosts service returns:', x)),
                    map(post => [post, null]),
                    catchError((err) => {
                        return of([null, err]);
                    })
                )),
            map(([posts, err]: [Post[], Error]) => {
                if (err) {
                    console.warn('getPost err:', err);
                    return new GetPostError({ error: err });
                }
                return new GetPostSuccess({ posts });
            }),
            catchError((err) => {
                console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
                return of(new FatalError({ error: err }));
            })
        );

    @Effect()
    notifPostsDataFetched$ = this.actions$
        .pipe(
            ofType(PostActionTypes.GetPostSuccessType),
            map(x => new DataWasFetched({ posts: true }))
        );


    @Effect()
    getmycontactsPosts$ = this.actions$
        .pipe(
            ofType(PostActionTypes.GetMyContactsPostsBeginType),
            tap(x => console.log('getmycontactsPosts (starts) ', x)),
            withLatestFrom(this.store$, this.store$.select('contacts')), // CONTACTS_FEATURE_STATE_NAME
            map(([_, rootState, contactState]: [any, AppState, ContactsState]) => {
                if (rootState.appStart.contactsFetched) {
                    return [null, contactState.mycontacts];
                }
                console.warn('getmycontactsPosts$: should dispatch GetMyContactsBegin to handle data dependency');
                return [new GetMyContactsBegin({ successCallback: new GetMyContactsPostsBegin() }), null];
            }),
            tap(x => console.log('getmycontactsPosts (a) [needsContactsFetching, contacts, callback]:', x)),

            map(([dependency, contacts]: [GetMyContactsBegin, ContactSearchResult[]]) => {
                if (dependency) {
                    return dependency;
                }
                return new HandleParallelContacts({ contacts });
            }),
            tap(x => console.log('getmycontactsPosts (final):', x)),
            catchError((err) => {
                console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
                return of(new FatalError({ error: err }));
            })

        );

    @Effect()
    handleInParallelForContacts$ = this.actions$
        .pipe(
            ofType(PostActionTypes.HandleParallelContactsType),
            switchMap((action: HandleParallelContacts) => {

                // forkJoin takes an array of observables and returns an array of responses for each observable inputs
                return forkJoin(...action.payload.contacts.map(contact => this.service.getPublicPostsFor(contact.id)))
                    .pipe(
                        tap(x => console.log('handleInParallelForContacts (b) array of arrays', x)),
                        map((x: Array<Array<Post>>) => {
                            console.log('to flatten:', x);
                            const flattened = new Array<Post>();
                            for (let index = 0; index < x.length; index++) {
                                for (let z = 0; z < x[index].length; z++) {
                                    const target = x[index][z];
                                    if (Array.isArray(target)) {
                                        console.warn('unexpected third array level found, fix needed');
                                    }
                                    flattened.push(target);
                                }
                            }
                            return flattened;
                        }),
                        map(arr => new GetMyContactsPostsSuccess({ mycontactsPosts: arr })),
                        catchError((err) => {
                            console.error('getmycontactsPosts err', err);
                            return of(new GetMyContactsPostsError({ error: err }));
                        })
                    );
            }),
        );

    @Effect()
    createPost$ = this.actions$
        .pipe(
            ofType(PostActionTypes.CreateUpdatePostBeginType),
            withLatestFrom(this.store$.select('auth')),
            switchMap(([x, state]: [CreateUpdatePostBegin, AuthState]) => {
                // set author since everyone can see it
                x.payload.post.authorId = state.blockstackId;
                return this.service.writePost(x.payload.post)
                    .pipe(
                        map((written: boolean) => written ? new CreateUpdatePostSuccess()
                            : new PostError({ error: new Error('writePost returned false') })),
                        catchError((err) => {
                            return of(new PostError({ error: err }));
                        })
                    );
            }),
            catchError((err) => {
                console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
                return of(new FatalError({ error: err }));
            })
        );

    @Effect()
    deletePost$ = this.actions$
        .pipe(
            ofType(PostActionTypes.DeletePostBeginType),
            switchMap((x: DeletePostBegin) => this.service.deletePost(x.payload.id)
                .pipe(
                    map((deleted: boolean) => deleted ? new DeletePostSuccess()
                        : new DeletePostError({ error: new Error('deletePost returned false') })),
                    catchError((err) => {
                        return of(new DeletePostError({ error: err }));
                    })
                )
            ),
            catchError((err) => {
                console.warn('Uncaught error detected, broken pipe, NGRX effects might not work due to :', err);
                return of(new FatalError({ error: err }));
            })
        );


    @Effect()
    navBackAfterPostCreatedOrUpdated$ = this.actions$
        .pipe(
            ofType(PostActionTypes.CreateUpdatePostSuccessType),
            map(() => new Back())
        );

    @Effect()
    navToEditPost$ = this.actions$
        .pipe(
            ofType(PostActionTypes.SetPostToEditType),
            map(() => new Go({ path: ['/wall/edit'] }))
        );
    @Effect()
    navToNewPost$ = this.actions$
        .pipe(
            ofType(PostActionTypes.NewPostRedirectType),
            map(() => new Go({ path: ['/wall/new'] }))
        );
}
