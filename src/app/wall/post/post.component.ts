import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostState, getAllPosts, isPending } from '.';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { GetPostBegin, SetPostToEdit, NewPostRedirect, DisplayConfirm, GetMyContactsPostsBegin } from './post.actions';
import { PostService } from './post.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    mypost$: Observable<Post[]>;
    isPending$: Observable<boolean>;
    constructor(private store$: Store<PostState>, private postService: PostService) { }

    ngOnInit() {
        this.mypost$ = this.store$.select(getAllPosts);
        this.isPending$ = this.store$.select(isPending);
        this.store$.dispatch(new GetPostBegin());
        this.store$.dispatch(new GetMyContactsPostsBegin());
    }
    newPost() {
        this.store$.dispatch(new NewPostRedirect());
    }
    getallPost() {
        this.store$.dispatch(new GetMyContactsPostsBegin());
    }
    editPost(post: Post) {
        this.store$.dispatch(new SetPostToEdit({ post }));
    }

    displayConfirmDeletion(post: Post) {
        this.store$.dispatch(new DisplayConfirm({ post }));
    }

}
