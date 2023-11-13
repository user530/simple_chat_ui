import React from 'react';
import { useAppSelector } from '../hooks/chatStoreHooks';
import { TypingUsersComponent } from './TypingUsersComponent';
import { ChatInputComponent } from './ChatInputComponent';

interface ChatComponentProps {
    sendMessageCb: (msg: string) => void;
    isTypingCb: (timeout: NodeJS.Timeout | null) => NodeJS.Timeout;
}

export const ChatComponent: React.FC<ChatComponentProps> = (props: ChatComponentProps) => {
    const { sendMessageCb, isTypingCb } = props;
    const messagesWindowRef = React.useRef<HTMLDivElement>(null);
    const users = useAppSelector((state) => state.users.users);
    const messages = useAppSelector((state) => state.messages.messages);

    React.useEffect(
        () => {
            const msgWindow = messagesWindowRef.current;
            if (msgWindow) {
                msgWindow.scrollTo({
                    top: msgWindow.scrollHeight,
                    behavior: 'smooth'
                });
            }
        },
        [messages]
    )

    return <>
        <div className='chat-output'>
            <div className='users'>
                <h3 className='users-heading'>Users:</h3>
                <div className='users-list' style={{ listStyleType: 'none' }}>
                    {
                        users.map(
                            (user, ind) => <div className='chat-user-name' key={ind}>{user}</div>
                        )
                    }
                </div>
            </div>
            <div className='chat'>
                <div className='chat-inner'>
                    <h3 className='messages-header'>Messages:</h3>
                    <div className='messages-window' ref={messagesWindowRef}>
                        {
                            messages.map(
                                (message, ind) => <div className='chat-message' key={ind}>
                                    <strong>[{message.author}]:</strong> {message.text}
                                </div>)
                        }
                    </div>
                </div>
                <div className='chat-outer'>
                    <TypingUsersComponent />
                </div>
            </div>
        </div>

        <ChatInputComponent isTypingCb={isTypingCb} sendMessageCb={sendMessageCb} />
    </>
}