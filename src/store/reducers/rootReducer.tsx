import { combineReducers } from '@reduxjs/toolkit';
import { messagesSlice, usersSlice } from './slices';

const rootReducer = combineReducers({
    users: usersSlice,
    messages: messagesSlice,
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;