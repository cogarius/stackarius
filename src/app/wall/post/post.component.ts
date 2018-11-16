import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostState, getAllPosts, isPending } from '.';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { GetPostBegin, SetPostToEdit, NewPostRedirect, DisplayConfirm, GetMyContactsPostsBegin } from './post.actions';
import { PostService } from './post.service';
import * as blockstack from 'blockstack'; // TODO: remove this

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

    writePost() {
        this.postService.writePost({
            title: 'title1',
            content: 'content1'
        } as Post).subscribe(x => console.log('post written', x), err => console.error(err));
    }
    readPosts() {
        this.postService.getMyPosts()
            .subscribe(x => console.log('post read', x), err => console.error(err));
    }

    deletePublicFile() {
        const path = 'public/posts/post_index.json'; // 'public/posts/post_index.json';ublic/posts/post_index.json
        this.postService.deletePublicFile(path)
            .subscribe(x => console.log('deletePublicPath deleted ', x), err => console.error(err));
    }

    getAllFiles() {
        // listFiles
        blockstack.listFiles((file) => {
            console.log('file:', file);
            return true;
        }).then((listed) => console.log('# of files listed:', listed))
            .catch((err) => console.error(err));
    }

}
