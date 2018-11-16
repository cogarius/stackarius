import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Note } from 'src/app/core/models/note.model';
import { FileService } from 'src/app/core/services/file.service';
import { map, tap, switchMap, mergeMap } from 'rxjs/operators';
import { NoteIndex } from 'src/app/core/models/note-index.model';
import { DeleteNoteError } from './notes.actions';

@Injectable({
    providedIn: 'root'
})
export class NoteService {

    constructor(private fileService: FileService) { }

    /**
   * Fetches the last 10 notes from private notes
   */
    public getNotes(take: number = 10, skip: number = 0): Observable<Note[]> {
        return this.fileService.getPrivateNoteIndex()
            .pipe(
                switchMap((nindex: NoteIndex) => {
                    const sorted = Object.keys(nindex)
                        .filter(key => key ? true : false) // avoid undefined keys (after deletion)
                        .sort((a, b) => b.localeCompare(a));
                    return of(sorted.slice(skip, skip + take));
                }),
                mergeMap(arr => forkJoin(...arr.map(id => this.fileService.getPrivateNote(id)))),
            );
    }

    public deleteNote(id: string): Observable<boolean> {
        return this.writeNote({ id } as Note)
            .pipe(
                switchMap((wipedOut: boolean) => {
                    if (wipedOut) {
                        return this.fileService.getPrivateNoteIndex()
                            .pipe(
                                tap(x => console.log('[deleteNote] note index:', x)),
                                switchMap((nindex: NoteIndex) => {
                                    nindex[id] = undefined; // cheap erase
                                    return this.fileService.writeNoteIndex(nindex);
                                })
                            );
                    }
                    return of(false);
                })
            );
    }
    /**
     * create or update note
     * @param note : id is provided then file will be overwritten
     */
    public writeNote(note: Note): Observable<boolean> {
        const nowDate = new Date();
        const toSave: Note = {
            ...note,
            id: note.id ? note.id : nowDate.getTime().toString(),
            created: note.id ? note.created : nowDate,
            updated: nowDate
        };
        return this.fileService.getPrivateNoteIndex()
            .pipe(
                tap(x => console.log('[writeNote] note index read:', x)),
                map((nindex: NoteIndex) => {
                    nindex[toSave.id] = FileService.getPrivateNotePath(toSave.id);
                    return nindex;
                }),
                switchMap((nindex: NoteIndex) => this.fileService.writeNoteIndex(nindex)),

                switchMap((success: boolean) => this.fileService.writePrivateNote(toSave)),
                tap(x => console.log('note saved:', x))
            );
    }

}
