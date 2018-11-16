import { WallModule } from './wall.module';

describe('HomeModule', () => {
    let wallModule: WallModule;

    beforeEach(() => {
        wallModule = new WallModule();
    });

    it('should create an instance', () => {
        expect(wallModule).toBeTruthy();
    });
});
