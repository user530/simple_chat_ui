import React from 'react';

interface LoginComponentProps {
    isJoined: boolean;
    loginCb: (name: string) => void;
    joinCb: () => void;
}

export const LoginComponent: React.FC<LoginComponentProps> = (props: LoginComponentProps) => {
    const { isJoined, loginCb, joinCb } = props;
    const nameRef = React.useRef<HTMLInputElement>(null);


    return (
        <>
            <div className="cover">
                <div className="login-screen-block">
                    <label>
                        Chat name:
                        <input type="text" ref={nameRef} />
                    </label>

                    <input type="button" value="Join" onClick={joinCb} />
                </div>
            </div>
        </>
    )
}

