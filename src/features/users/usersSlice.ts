import type {User} from "../../types/user.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {createUser, deleteUser, fetchUserById, fetchUsers, updateUser} from "./usersThunks.ts";

interface UsersState {
    items: User[];
    isLoading: boolean;
    error: string | null;
    totalCount: number;
    currentPage: number;
    currentUser: User | null;
}

const initialState: UsersState = {
    items: [],
    isLoading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    currentUser: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.items;
                state.totalCount = action.payload.totalCount;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Произошла ошибка';
            })
            .addCase(fetchUserById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.currentUser = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Не удалось загрузить данные пользователя';
            })
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.unshift(action.payload);
                state.totalCount += 1;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Не удалось создать пользователя';
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Не удалось обновить данные пользователя';
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {{
                state.items = state.items.filter((item) => item.id !== action.payload);
                state.totalCount -= 1;
            }});
    }
});

export const { setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;