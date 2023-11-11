import React from 'react';

interface ChatMessage {
    author: string;
    text: string;
}

interface ChatComponentProps {
    users: string[];
    sendMessageCb: () => void;
}

export const ChatComponent: React.FC<ChatComponentProps> = (props: ChatComponentProps) => {
    const { users, sendMessageCb, } = props;
    const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);
    const chatWindow = React.useRef<HTMLInputElement>(null);

    React.useEffect(
        () => {

        },
        []
    )

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
                        chatMessages.map(
                            (message, ind) => <div className='message p-2' key={ind}>[{message.author}]: {message.text}</div>)
                    }
                </div>

            </div>
            <div className="chat-input">
                <input type="text" ref={chatWindow} placeholder='Enter your message' style={{ minHeight: '50px', minWidth: '500px' }} />
                <input type="button" value="Send" onClick={sendMessageCb} />
            </div>
        </div>
    </>
}