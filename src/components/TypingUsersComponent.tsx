import React from 'react'
import { useAppSelector } from '../hooks/chatStoreHooks'

export const TypingUsersComponent: React.FC = () => {
    const typingUsers = useAppSelector((state) => state.typingUsers.typingUsers);
    const [displayString, setDisplayString] = React.useState<string>('');

    React.useEffect(
        () => {
            const typingNumber = typingUsers.length;
            switch (true) {
                case (typingNumber === 0):
                    setDisplayString('');
                    break;
                case (typingNumber === 1):
                    setDisplayString(`${typingUsers[0]} is typing...`);
                    break;
                case (typingNumber < 4):
                    setDisplayString(`${typingUsers.join(', ')} are typing...`);
                    break;
                default:
                    setDisplayString('Multiple people are typing...');
            }
        },
        [typingUsers]
    )

    return (
        <>
            <div className='chat-userTyping'>{displayString}</div>
        </>
    )
}

