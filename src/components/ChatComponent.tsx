import React from 'react';
import { useAppSelector } from '../hooks/chatStoreHooks';
import { TypingUsersComponent } from './TypingUsersComponent';

interface ChatComponentProps {
    sendMessageCb: (msg: string) => void;
    isTypingCb: (timeout: NodeJS.Timeout | null) => NodeJS.Timeout;
}

export const ChatComponent: React.FC<ChatComponentProps> = (props: ChatComponentProps) => {
    const { sendMessageCb, isTypingCb } = props;
    const chatWindow = React.useRef<HTMLInputElement>(null);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const users = useAppSelector((state) => state.users.users);
    const messages = useAppSelector((state) => state.messages.messages);

    const sendMessageHandler = () => {
        const chatInput = chatWindow.current!;
        sendMessageCb(chatInput.value);
        chatInput.value = '';
    }

    const isTypingHandler = () => {
        const timer = isTypingCb(timeoutRef.current);
        timeoutRef.current = timer;
    }

    return <>
        <div>
            <div className="chat-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="chat-users" style={{ minWidth: '200px', minHeight: '300px', border: '1px solid black' }}>
                    {
                        users.map(
                            (user, ind) => <div className='chat-user-name' key={ind}>{user}</div>
                        )
                    }
                </div>
                <div className="chat-messages" style={{ minWidth: '500px', minHeight: '300px', border: '1px solid black' }}>
                    {
                        messages.map(
                            (message, ind) => <div className='message p-2' key={ind}>[{message.author}]: {message.text}</div>)
                    }
                </div>

            </div>
            <div className="chat-input">
                <input type="text" ref={chatWindow} placeholder='Enter your message' style={{ minHeight: '50px', minWidth: '500px' }} onChange={isTypingHandler} />
                <input type="button" value="Send" onClick={sendMessageHandler} />
            </div>

            <TypingUsersComponent />
        </div>
    </>
}