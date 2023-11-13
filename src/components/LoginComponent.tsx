import React from 'react';

interface LoginComponentProps {
    loginCb: (name: string) => void;
}

export const LoginComponent: React.FC<LoginComponentProps> = (props: LoginComponentProps) => {
    const { loginCb } = props;
    const nameRef = React.useRef<HTMLInputElement>(null);

    const joinChatHandler = () => {
        const nameInput = nameRef.current!.value.trim();
        const name = nameInput.length === 0 ? `User#${Date.now()}` : nameInput;
        loginCb(name);
    };

    return (
        <>
            <input className='window-textInput' type="text" ref={nameRef} placeholder='Chat name' />
            <button className='window-btnBig' onClick={joinChatHandler}><u>J</u>oin</button>
        </>
    )
}

