import usersReducer, { setCurrentPage } from './usersSlice';
import { updateUser } from './usersThunks';

describe('usersSlice reducer', () => {
    const getInitialState = () => ({
        items: [
            {
                id: '1',
                name: 'Старое Имя',
                email: 'old@test.com',
                avatar: '',
                createdAt: '2026-06-30T12:00:00.000Z'
            }
        ],
        isLoading: false,
        error: null,
        currentPage: 1,
        totalCount: 1,
        currentUser: null
    });

    it('test1', () => {
        const state = getInitialState();
        const actualState = usersReducer(state, setCurrentPage(3));
        expect(actualState.currentPage).toBe(3);
    });

    it('test2', () => {
        const state = getInitialState();
        const updatedUser = {
            id: '1',
            name: 'Новое имя',
            email: 'old@test.com',
            avatar: '',
            createdAt: '2026-06-30T12:00:00.000Z'
        };

        const action = {
            type: updateUser.fulfilled.type,
            payload: updatedUser
        };

        const actualState = usersReducer(state, action);

        expect(actualState.items[0].name).toBe('Новое имя');
        expect(actualState.items.length).toBe(1);
    });
});