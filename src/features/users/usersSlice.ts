import type {User} from "../../types/user.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUsers} from "./usersThunks.ts";

interface UsersState {
    items: User[];
    isLoading: boolean;
    error: string | null;
    totalCount: number;
    currentPage: number;
}

const initialState: UsersState = {
    items: [],
    isLoading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
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
    }
})