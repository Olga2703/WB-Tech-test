import type {CreateUserData, User} from "../../types/user.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../../api/instance.ts";


interface FetchUsersArgs {
    page: number;
    limit: number;
}

interface FetchUsersResponse {
    items: User[];
    totalCount: number;
}

export const fetchUsers = createAsyncThunk<FetchUsersResponse, FetchUsersArgs, { rejectValue: string }>(
    'users/fetchUsers',
    async ({page, limit}, {rejectWithValue}) => {
        try {
            const response = await instance.get<User[]>(`/users?page=${page}&limit=${limit}`);
            const totalResponse = await instance.get<User[]>('/users');

            return {
                items: response.data,
                totalCount: totalResponse.data.length,
            };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Не удалось загрузить пользователей')
        }
    }
);


export const fetchUserById = createAsyncThunk<User, string, { rejectValue: string }>(
    'user/fetchUserById',
    async (id, {rejectWithValue}) => {
        try {
            const response = await instance.get<User>(`/users/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Не удалось загрузить данные пользователя')
        }
    }
);

export const createUser = createAsyncThunk<User, CreateUserData, { rejectValue: string }>(
    'users/createUser',
    async (data, {rejectWithValue}) => {
        try {
            const response = await instance.post<User>('/users', data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Не удалось создать пользователя')
        }
    }
);

export const updateUser = createAsyncThunk<User, { id: string; data: CreateUserData }, { rejectValue: string }>(
    'users/updateUser',
    async ({id,data}, {rejectWithValue}) => {
        try {
            const response = await instance.put<User>(`/users/${id}`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Не удалось обновить пользователя');
        }
    }
);

export const deleteUser = createAsyncThunk<string, string, { rejectValue: string } >(
    'users/deleteUser',
    async (id, {rejectWithValue}) => {
        try {
            await instance.delete(`/users/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Не удалось удалить пользователя');
        }
    }
);






