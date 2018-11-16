import { reducer, initialState } from './app-start.reducer';

describe('AppStart Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {} as any;

            const result = reducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });
});
