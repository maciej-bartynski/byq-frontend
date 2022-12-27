import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'reduxStorage/store';
import getUsers from 'lib/services/fetchByQ/users/getUsers';
import OtherUser from 'types/OtherUser';

export interface OtherUsersState {
    otherUsers: OtherUser[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: OtherUsersState = {
    otherUsers: [],
    status: 'idle',
};

export const fetchUsersAsync = createAsyncThunk(
    'users/fetchUsersAsync',
    async () => {
        const otherUsers = await getUsers();
        return otherUsers;
    }
);

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.otherUsers = action.payload;
            })
            .addCase(fetchUsersAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const selectUsers = (state: RootState) => state.users;
export default usersSlice.reducer;
