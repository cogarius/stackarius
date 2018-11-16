import { Injectable } from '@angular/core';
import * as blockstack from 'blockstack';
import { Observable, from, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    public getFile<T>(path: string, inClearText: boolean = false, otherUser: string = null): Observable<T> {
        const options = { decrypt: !inClearText, username: otherUser };

        return from(blockstack.getFile(path, options))
            .pipe(
                tap(x => console.log(`File for user ${otherUser || 'this is myself'} read at ${path} : ${x}`)),
                map((x: string) => JSON.parse(x)),
                catchError((err) => {
                    console.error('ERROR getFile for path:', path, err);
                    return of(null);
                })
            );
    }
    public writeFile<T>(path: string, data: T, inClearText: boolean = false): Observable<boolean> {
        const content = JSON.stringify(data);
        const options = { encrypt: !inClearText };
        let arrLength = 0;
        if (Array.isArray(data)) {
            arrLength = data.length;
        }
        return from(blockstack.putFile(path, content, options))
            .pipe(
                tap(x => console.log(`File written at ${path} : ${x} containing ${arrLength} elements`)),
                map(x => true),
                catchError((err) => {
                    console.error('ERROR writePrivateNote for path:', path, err);
                    return of(false);
                })
            );
    }
}
