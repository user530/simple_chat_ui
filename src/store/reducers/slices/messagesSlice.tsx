import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessagesStoreState {
    messages: string[];
}

const initialState: MessagesStoreState = {
    messages: []
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<string>) {
            state.messages.push(action.payload);
        },
        setMessages(state, action: PayloadAction<string[]>) {
            state.messages = action.payload;
        }
    }
});

export const { addMessage, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;