import { fetchUsers } from './usersThunks';
import MockAdapter from 'axios-mock-adapter';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import instance from '../../api/instance.ts';

const mockAxios = new MockAdapter(instance);

describe('userThunks - fetchUsers', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    it('test1', async () => {
        const mockPageData = [{id: '1', name: 'Иван Иванов', avatar: ''}];
        const mockTotalData = [{id: '1'}, {id: '2'}];

        mockAxios.onGet().replyOnce(200, mockPageData);
        mockAxios.onGet().replyOnce(200, mockTotalData);

        const store = configureStore({
            reducer: { users: usersReducer },
        });

        const result = await store.dispatch(fetchUsers({ page: 1, limit: 5 }));

        expect(result.type).toBe('users/fetchUsers/fulfilled');
        expect(result.payload).toEqual({
            items: mockPageData,
            totalCount: 2,
        });
    });

    it('test2', async () => {
        mockAxios.onGet(/users/).reply(500);
        const store = configureStore({
            reducer: { users: usersReducer },
        });
        const result = await store.dispatch(fetchUsers({ page: 1, limit: 5 }));

        expect(result.type).toBe('users/fetchUsers/rejected');
        expect(result.payload).toBe('Request failed with status code 500');
    });

})