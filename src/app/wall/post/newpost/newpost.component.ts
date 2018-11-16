import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Back } from 'src/app/store/navigation';
import { CreateUpdatePostBegin } from '../post.actions';
import { Observable, Subscription } from 'rxjs';
import { getPostToEdit, isEditMode } from '../post.selectors';
import { Post } from 'src/app/core/models/post.model';

@Component({
    selector: 'app-newpost',
    templateUrl: './newpost.component.html',
    styleUrls: ['./newpost.component.css']
})
export class NewPostComponent implements OnInit, OnDestroy {

    newPostForm: FormGroup;
    postToEdit$: Observable<Post>;
    beforeEdition: Post;
    isEditMode$: Observable<boolean>;
    sub: Subscription;


    constructor(private store$: Store<AppState>) { }

    ngOnInit() {
        this.postToEdit$ = this.store$.select(getPostToEdit);
        this.isEditMode$ = this.store$.select(isEditMode);

        this.sub = this.postToEdit$.subscribe(post => this.createFormData(post));

    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    createFormData(x: Post) {
        this.beforeEdition = x ? x : {} as Post;
        this.newPostForm = new FormGroup({
            postId: new FormControl(this.beforeEdition.id),
            postTitle: new FormControl(this.beforeEdition.title, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30)
            ]),
            postContent: new FormControl(this.beforeEdition.content, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(256)
            ]),
        });
    }
    onSubmit() {
        if (this.newPostForm.valid) {
            const toSave = {
                ...this.beforeEdition,
                title: this.newPostForm.value.postTitle,
                content: this.newPostForm.value.postContent,
            };
            console.warn('submit:', this.newPostForm.value);
            this.store$.dispatch(new CreateUpdatePostBegin({ post: toSave }));
        }
    }
    cancel() {
        // this.store$.dispatch(new NewPostCancel());
        this.store$.dispatch(new Back());
    }

}
