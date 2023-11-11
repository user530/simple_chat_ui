import { ChatMessage } from '../store/reducers/slices/messagesSlice';

export type LoginAttemptResponse = LoginAttemptResponseSuccess | LoginAttemptResponseFail;

type LoginAttemptResponseSuccess = {
    status: 'success',
    users: string[],
    messages: ChatMessage[],
}

type LoginAttemptResponseFail = {
    status: 'failed',
    message: string,
}