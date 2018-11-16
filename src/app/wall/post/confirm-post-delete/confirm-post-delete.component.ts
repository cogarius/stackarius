import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { displayConfirmDelete, getPostToDelete } from '..';
import { Post } from 'src/app/core/models/post.model';
import { CancelConfirm, DeletePostBegin } from '../post.actions';

@Component({
    selector: 'app-confirm-post-delete',
    templateUrl: './confirm-post-delete.component.html',
    styleUrls: ['./confirm-post-delete.component.css']
})
export class ConfirmPostDeleteComponent implements OnInit {
    openModal$: Observable<boolean>;
    toDelete$: Observable<Post>;

    constructor(private store$: Store<AppState>) { }

    ngOnInit() {
        this.openModal$ = this.store$.select(displayConfirmDelete);

        this.toDelete$ = this.store$.select(getPostToDelete);
    }

    cancelDeletion() {
        this.store$.dispatch(new CancelConfirm());
    }
    deletePost(post: Post) {
        if (post && post.id) {
            this.store$.dispatch(new DeletePostBegin({ id: post.id }));
        }
    }
}
