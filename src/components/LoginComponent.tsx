import React from 'react';
import { GrChat, GrClose } from 'react-icons/gr'

interface LoginComponentProps {
    loginCb: (name: string) => void;
}

export const LoginComponent: React.FC<LoginComponentProps> = (props: LoginComponentProps) => {
    const { loginCb } = props;
    const nameRef = React.useRef<HTMLInputElement>(null);

    const joinChatHandler = () => {
        const nameInput = nameRef.current!.value.trim();
        const name = nameInput.length === 0 ? `Anonymous#${Date.now()}` : nameInput;
        loginCb(name);
    };

    return (
        <div className='custom-container'>

            <div className='window'>
                <div className='window-header'>
                    <GrChat className='window-header--icon' />
                    <span className='window-header--text'>WinChat</span>
                    <GrClose className='window-header--controls' />
                </div>

                <div className='window-controls'>
                    <div><u>F</u>ile</div>
                    <div><u>V</u>iew</div>
                    <div><u>T</u>ools</div>
                    <div><u>H</u>elp</div>
                </div>

                <hr className='window-linebreak' />

                <div className="window-body">
                    <input className='window-textInput' type="text" ref={nameRef} placeholder='Chat name' />
                    <button className='window-btnBig' onClick={joinChatHandler}><u>J</u>oin</button>
                </div>



            </div>

        </div>
    )
}

