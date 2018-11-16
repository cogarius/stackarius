import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { SignOutBegin } from 'src/app/auth-blockstack/auth.actions';
import { Observable } from 'rxjs';
import { isAuthenticated, getUserId } from 'src/app/auth-blockstack/auth.selectors';
import * as blockstack from 'blockstack';
import { PostService } from 'src/app/wall/post/post.service';
import { NoteService } from 'src/app/home/notes/note.service';
import { ContactsService } from 'src/app/contacts/services/contacts.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    authenticated$: Observable<boolean>;
    userId$: Observable<string>;

    constructor(private store$: Store<AppState>,
        private postService: PostService,
        private contactsService: ContactsService,
        private noteService: NoteService) {
    }

    ngOnInit() {
        this.authenticated$ = this.store$.select(isAuthenticated);
        this.userId$ = this.store$.select(getUserId);
    }

    signOut() {
        this.store$.dispatch(new SignOutBegin());
    }

    cleanAllIndexes() {
        this.resetPublicIndex();
        this.resetPrivateIndex();
        this.resetContactsIndex();
    }
    resetPublicIndex() {
        const path = 'public/posts/post_index.json';
        this.postService.deletePublicFile(path)
            .subscribe(x => console.log('resetPublicIndex done ', x), err => console.error(err));
    }
    resetPrivateIndex() {
        this.noteService.deletePrivateNoteIndex()
            .subscribe(x => console.log('resetPrivateIndex done ', x), err => console.error(err));
    }
    resetContactsIndex() {
        this.contactsService.deletePrivateContactsIndex()
            .subscribe(x => console.log('resetContactsIndex done ', x), err => console.error(err));
    }
}

