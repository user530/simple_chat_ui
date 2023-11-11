import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChatMessage {
    author: string;
    text: string;
}

interface MessagesStoreState {
    messages: ChatMessage[];
}

const initialState: MessagesStoreState = {
    messages: []
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<ChatMessage>) {
            state.messages.push(action.payload);
        },
        setMessages(state, action: PayloadAction<ChatMessage[]>) {
            state.messages = action.payload;
        }
    }
});

export const { addMessage, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;