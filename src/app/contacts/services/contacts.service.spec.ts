import { TestBed } from '@angular/core/testing';

import { ContactsService } from './contacts.service';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';

describe('ContactsService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({}), HttpClientModule],
    }));

    it('should be created', () => {
        const service: ContactsService = TestBed.get(ContactsService);
        expect(service).toBeTruthy();
    });
});
