import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from '../models/note.model';
import { NoteIndex } from '../models/note-index.model';
import { PostIndex } from '../models/post-index.model';
import { Post } from '../models/post.model';
import { StorageService } from './storage.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class FileService {

    private NOTE_INDEX_PATH = 'private/notes/note_index.json';
    private POST_INDEX_PATH = 'public/posts/post_index.json';

    constructor(private storage: StorageService) { }

    static getPrivateNotePath(noteID: string) {
        return `private/notes/note_${noteID}.json`;
    }

    static getPostPath(postID: string) {
        return `public/posts/post_${postID}.json`;
    }

    writePrivateNote(note: Note): Observable<boolean> {
        if (!note.id) {
            return of(false);
        }
        const path = FileService.getPrivateNotePath(note.id);
        return this.storage.writeFile(path, note);
    }

    writeNoteIndex(nindex: NoteIndex): Observable<boolean> {
        if (!nindex) {
            return of(false);
        }
        return this.storage.writeFile(this.NOTE_INDEX_PATH, nindex);
    }


    getPrivateNoteIndex(): Observable<NoteIndex> {
        return this.storage.getFile<NoteIndex>(this.NOTE_INDEX_PATH)
            .pipe(
                map(x => x ? x : new NoteIndex())
            );
    }

    getPrivateNote(noteId: string): Observable<Note> {
        const path = FileService.getPrivateNotePath(noteId);
        return this.storage.getFile(path);
    }

    writePost(post: Post): Observable<boolean> {
        if (!post.id) {
            return of(false);
        }
        const path = FileService.getPostPath(post.id);

        return this.storage.writeFile(path, post, true);
    }

    writePostIndex(nindex: PostIndex): Observable<boolean> {
        if (!nindex) {
            return of(false);
        }
        return this.storage.writeFile(this.POST_INDEX_PATH, nindex, true);
    }

    getPostIndex(): Observable<PostIndex> {
        return this.getPostIndexForUser(null);
    }
    getPostIndexForUser(userId: string): Observable<PostIndex> {
        return this.storage.getFile<PostIndex>(this.POST_INDEX_PATH, true, userId)
            .pipe(
                map(x => x ? x : new PostIndex())
            );
    }

    getPost(postId: string): Observable<Post> {
        const path = FileService.getPostPath(postId);
        return this.storage.getFile(path, true);
    }
    getPostForUser(postId: string, contactId: string): Observable<Post> {
        const path = FileService.getPostPath(postId);
        return this.storage.getFile<Post>(path, true, contactId)
            .pipe(
                tap(x => console.log('file svc getPostForUser returns:', x))
            );
    }

}
