import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TypingStoreState {
    typingUsers: string[];
}

const initialState: TypingStoreState = {
    typingUsers: [],
}

const typingSlice = createSlice({
    name: 'typingUsers',
    initialState,
    reducers: {
        addTypingUser(state, action: PayloadAction<string>) {
            const userExist = state.typingUsers.find((user: string) => user === action.payload);
            if (!userExist) state.typingUsers.push(action.payload);
        },
        removeTypingUser(state, action: PayloadAction<string>) {
            state.typingUsers = state.typingUsers.filter(user => user !== action.payload);
        }
    }
})

export const { addTypingUser, removeTypingUser } = typingSlice.actions;
export default typingSlice.reducer;