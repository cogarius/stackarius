import { Injectable } from '@angular/core';
import { ContactSearchResult, ContactList } from '../models/contact-search.model';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BlockstackIdentity, BlockstackSearchResponse } from '../models/search.blockstack.model';
import { tap, map, switchMap } from 'rxjs/operators';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {

    // https://core.blockstack.org/v1/search?query=coga
    private searchUrl = 'https://core.blockstack.org/v1/search';
    private CONTACT_LIST_PATH = 'private/contacts/contacts_list.json';

    constructor(private http: HttpClient,
        private storage: StorageService) { }

    public searchContacts(queryValue: string): Observable<ContactSearchResult[]> {
        if (!queryValue || queryValue.trim().length < 1) {
            return of(new Array<ContactSearchResult>());
        }
        return this.http.get<BlockstackSearchResponse>(this.searchUrl, { params: { query: queryValue.trim() } })
            .pipe(
                map((r: BlockstackSearchResponse) => {
                    return r.results.map(i => this.mapToSearchResult(i));
                })
            );
    }

    public addToContacts(contact: ContactSearchResult): Observable<boolean> {
        if (!contact || !contact.id) {
            return of(false);
        }

        return this.storage.getFile<ContactList>(this.CONTACT_LIST_PATH).pipe(
            switchMap((list: ContactList) => {
                if (!list) {
                    console.warn('get contact list is null, path:', this.CONTACT_LIST_PATH);
                    list = new Array<ContactSearchResult>();
                }
                list.push(contact);
                return this.storage.writeFile(this.CONTACT_LIST_PATH, list);
            })
        );
    }

    public removeFromContacts(contactId: string): Observable<boolean> {
        if (!contactId) {
            return of(false);
        }

        return this.storage.getFile<ContactList>(this.CONTACT_LIST_PATH).pipe(
            switchMap((list: ContactList) => {
                if (!list) {
                    console.warn('removeFromContacts contact list is null, path:', this.CONTACT_LIST_PATH);
                    list = new Array<ContactSearchResult>();
                }
                const newList = list.filter(x => x.id !== contactId); // remove
                return this.storage.writeFile(this.CONTACT_LIST_PATH, newList);
            })
        );
    }

    getPrivateContactList(): Observable<ContactList> {
        return this.storage.getFile<ContactList>(this.CONTACT_LIST_PATH)
            .pipe(
                map(x => x ? x : new Array<ContactSearchResult>())
            );
    }

    private mapToSearchResult(identity: BlockstackIdentity): ContactSearchResult {
        if (!identity) { return null; }
        let description, url;

        if (identity.profile) {
            description = identity.profile.description;
            if (identity.profile.image && identity.profile.image.length > 0) {
                const avatars = identity.profile.image.filter(x => x.name === 'avatar');
                if (avatars && avatars.length > 0) {
                    url = avatars[0].contentUrl;
                } else {
                    url = identity.profile.image[0].contentUrl;
                }
            }
        }

        const result = {
            id: identity.fullyQualifiedName,
            name: identity.profile.name,
            description,
            url,
        } as ContactSearchResult;

        return result;
    }
}
