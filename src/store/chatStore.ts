import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

const chatStore = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof chatStore.getState>;
export type AppDispatch = typeof chatStore.dispatch;
export default chatStore;