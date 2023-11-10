export type loginAttemptResponse = loginAttemptResponseSuccess | loginAttemptResponseFail;

type loginAttemptResponseSuccess = {
    status: 'success',
    users: string[],
}

type loginAttemptResponseFail = {
    status: 'failed',
    message: string,
}