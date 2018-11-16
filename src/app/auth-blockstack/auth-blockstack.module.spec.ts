import { AuthBlockstackModule } from './auth-blockstack.module';

describe('AuthBlockstackModule', () => {
    let authBlockstackModule: AuthBlockstackModule;

    beforeEach(() => {
        authBlockstackModule = new AuthBlockstackModule();
    });

    it('should create an instance', () => {
        expect(authBlockstackModule).toBeTruthy();
    });
});
