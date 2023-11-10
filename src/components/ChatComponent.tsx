import React from 'react';

interface ChatMessage {
    author: string;
    text: string;
}

interface ChatComponentProps {
    sendMessageCb: () => void;
}

export const ChatComponent: React.FC<ChatComponentProps> = (props: ChatComponentProps) => {
    const { sendMessageCb } = props;
    const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);
    const chatWindow = React.useRef<HTMLInputElement>(null);

    return <>
        <div>
            <div className="chat-window">
                <div className="chat-container" >
                    {
                        chatMessages.map(
                            (message, ind) => <div className='message p-2' key={ind}>[{message.author}]: {message.text}</div>)
                    }
                </div>

                <input type="text" ref={chatWindow} placeholder='Enter your message' />
                <input type="button" value="Send" onClick={sendMessageCb} />
            </div>
        </div>
    </>
}