import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';

describe('FileService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: FileService = TestBed.get(FileService);
        expect(service).toBeTruthy();
    });
});

// TODO: test non null priavte note index is returned when there is non in the storage (init the first time)