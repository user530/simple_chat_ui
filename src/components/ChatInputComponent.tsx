import React from 'react';

interface ChatInputProps {
    sendMessageCb: (msg: string) => void;
    isTypingCb: (timeout: NodeJS.Timeout | null) => NodeJS.Timeout;
};

export const ChatInputComponent: React.FC<ChatInputProps> = (props: ChatInputProps) => {
    const { isTypingCb, sendMessageCb } = props;
    const chatWindowRef = React.useRef<HTMLInputElement>(null);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const [emptyMsg, setEmptyMsg] = React.useState<boolean>(true);

    const sendMessageHandler = () => {
        const chatInput = chatWindowRef.current!;
        sendMessageCb(chatInput.value);
        setEmptyMsg(true);
        chatInput.value = '';
    }

    const isTypingHandler = () => {
        const timer = isTypingCb(timeoutRef.current);
        timeoutRef.current = timer;
        setEmptyMsg(Boolean(chatWindowRef.current?.value.trim().length === 0));
    }

    return <div className='chat-input'>
        <input className='chat-inputText' type="text" ref={chatWindowRef} placeholder='Enter your message' onChange={isTypingHandler} />
        <button className='chat-inputBtn' onClick={sendMessageHandler} disabled={emptyMsg}><u>S</u>end</button>
    </div>
};