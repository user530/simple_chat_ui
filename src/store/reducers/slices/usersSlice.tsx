import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UsersStoreState {
    users: string[];
}

const initialState: UsersStoreState = { users: [] };

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<string>) {
            state.users.push(action.payload)
        },
        removeUser(state, action: PayloadAction<string>) {
            state.users = state.users.filter((user) => user !== action.payload)
        },
        setUsers(state, action: PayloadAction<string[]>) {
            state.users = action.payload;
        }

    }
});

export const { addUser, removeUser, setUsers } = usersSlice.actions;
export default usersSlice.reducer;