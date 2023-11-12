import { combineReducers } from '@reduxjs/toolkit';
import { messagesSlice, typingSlice, usersSlice } from './slices';

const rootReducer = combineReducers({
    users: usersSlice,
    messages: messagesSlice,
    typingUsers: typingSlice,
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;