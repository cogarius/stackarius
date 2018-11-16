import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { FileService } from 'src/app/core/services/file.service';
import { map, tap, switchMap, mergeMap } from 'rxjs/operators';
import { PostIndex } from 'src/app/core/models/post-index.model';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private fileService: FileService, private storage: StorageService) { }

    private arrayOfSortedKeys = (take: number = 10, skip: number = 0) => switchMap((nindex: PostIndex) => {
        const sorted = Object.keys(nindex)
            .filter(key => key ? true : false) // avoid undefined keys (after deletion)
            .sort((a, b) => b.localeCompare(a));
        return of(sorted.slice(skip, skip + take));
    })

    /**
   * Fetches the last 10 Posts from private Posts
   */
    public getMyPosts(take: number = 10, skip: number = 0): Observable<Post[]> {
        return this.fileService.getPostIndex()
            .pipe(
                tap(x => console.log('getMyPosts, Post index read:', x)),
                this.arrayOfSortedKeys(take, skip),
                tap(x => console.log('getMyPosts, ids sliced :', x)),

                mergeMap(arr => {
                    if (arr && arr.length > 0) { return forkJoin(...arr.map(id => this.fileService.getPost(id))); }
                    return of(new Array<Post>());
                }),
                tap(x => console.log('getMyPosts end, mergeMap forkJoin :', x)),
            );
    }

    public getPublicPostsFor(contactId: string, take: number = 10, skip: number = 0): Observable<Post[]> {
        return this.fileService.getPostIndexForUser(contactId)
            .pipe(
                tap(x => console.log('getPublicPostsFor, Post index read:', contactId, x)),
                this.arrayOfSortedKeys(take, skip),
                tap(x => console.log('getPublicPostsFor, ids sliced :', contactId, x)),
                mergeMap(arr => {
                    if (arr && arr.length > 0) { return forkJoin(...arr.map(id => this.fileService.getPostForUser(id, contactId))); }
                    return of(new Array<Post>());
                }),
                tap(x => console.log('getPublicPostsFor end, mergeMap forkJoin :', contactId, x)),
            );
    }
    public deletePost(id: string): Observable<boolean> {
        return this.writePost({ id } as Post)
            .pipe(
                switchMap((wipedOut: boolean) => {
                    if (wipedOut) {
                        return this.fileService.getPostIndex()
                            .pipe(
                                tap(x => console.log('[deletePost] Post index:', x)),
                                switchMap((nindex: PostIndex) => {
                                    nindex[id] = undefined; // cheap erase
                                    return this.fileService.writePostIndex(nindex);
                                })
                            );
                    }
                    return of(false);
                })
            );
    }

    deletePublicFile(path: string): Observable<boolean> {
        if (!path) {
            return of(false);
        }
        return this.storage.writeFile(path, '', true);
    }

    /**
     * create or update Post
     * @param Post : id id is provided then file will be overwritten
     */
    public writePost(post: Post): Observable<boolean> {
        const nowDate = new Date();
        const toSave: Post = {
            ...post,
            id: post.id ? post.id : nowDate.getTime().toString(),
            created: post.id ? post.created : nowDate,
            updated: nowDate
        };
        return this.fileService.getPostIndex()
            .pipe(
                tap(x => console.log('[writePost] Post index read:', x)),
                map((nindex: PostIndex) => {
                    nindex[toSave.id] = FileService.getPostPath(toSave.id);
                    return nindex;
                }),
                // tap(x => console.log('Post index updated:', x)),
                switchMap((nindex: PostIndex) => this.fileService.writePostIndex(nindex)),
                switchMap((success: boolean) => this.fileService.writePost(toSave)),
                tap(x => console.log('Post saved:', x))
                // TODO: revert Post index if file could not be stored : enforce consistency
            );
    }

}
