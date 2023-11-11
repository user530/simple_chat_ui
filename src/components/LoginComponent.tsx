import React from 'react';

interface LoginComponentProps {
    loginCb: (name: string) => void;
}

export const LoginComponent: React.FC<LoginComponentProps> = (props: LoginComponentProps) => {
    const { loginCb } = props;
    const nameRef = React.useRef<HTMLInputElement>(null);

    const joinChatHandler = () => loginCb(nameRef.current?.value ?? `Anonymous#${Date.now()}`);

    return (
        <>
            <div className="cover">
                <div className="login-screen-block">
                    <label>
                        Chat name:
                        <input type="text" ref={nameRef} />
                    </label>

                    <input type="button" value="Join" onClick={joinChatHandler} />
                </div>
            </div>
        </>
    )
}

