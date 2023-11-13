import React, { useEffect } from 'react';
import './App.css';
import { Socket, io } from 'socket.io-client';
import { LoginComponent, ChatComponent } from './components';
import { IsTypingRequest, IsTypingResponse, LoginAttemptRequest, LoginAttemptResponse, NewMessageRequest, NewMessageResponse } from './dtos';
import { useAppDispatch } from './hooks/chatStoreHooks';
import { addTypingUser, addUser, removeTypingUser, removeUser, setUsers } from './store/reducers/slices';
import { addMessage, setMessages } from './store/reducers/slices/messagesSlice';
import { GrChat, GrClose } from 'react-icons/gr'


function App() {
  const socketRef = React.useRef<Socket | null>(null);
  const [isJoined, setIsJoined] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:3001');
    }

    socketRef.current.on('disconnect', () => {
      setIsJoined(false);
    });

    socketRef.current.on(
      'userJoined',
      (name: string) => dispatch(addUser(name)));

    socketRef.current.on(
      'userLeft',
      (name: string) => dispatch(removeUser(name))
    )

    socketRef.current.on(
      'newMessage',
      (message: NewMessageResponse) => dispatch(addMessage(message)))

    socketRef.current.on(
      'isTyping',
      (typingEvent: IsTypingResponse) => {
        const { isTyping, name } = typingEvent;

        if (isTyping) dispatch(addTypingUser(name));
        else dispatch(removeTypingUser(name));
      }
    )

    return () => {
      if (socketRef.current) {
        socketRef.current?.disconnect();
        socketRef.current = null;
      }
    }
  }, [])

  const loginCb = React.useCallback(
    (userName: string) => {
      const name: LoginAttemptRequest = { name: userName };

      socketRef.current?.emit(
        'userLoginAttempt',
        name,
        (res: LoginAttemptResponse) => {
          const { status } = res;
          if (status === 'failed') alert(res.message)
          else {
            setIsJoined(true);
            dispatch(setUsers(res.users));
            dispatch(setMessages(res.messages));
          }
        });
    }, []
  );

  const sendMessageCb = React.useCallback(
    (message: string) => {
      const newMsg: NewMessageRequest = { authorId: socketRef.current!.id, text: message };

      socketRef.current?.emit(
        'createMessage',
        newMsg
      );
    },
    []
  )

  const closeChatHandler = () => { setIsJoined(false) };

  const isTypingCb = React.useCallback(
    (timeout: NodeJS.Timeout | null) => {
      const TYPING_DELAY_MS = 3000;
      const startedTyping: IsTypingRequest = { isTyping: true };
      const stopedTyping: IsTypingRequest = { isTyping: false };

      if (timeout) clearTimeout(timeout);

      socketRef.current?.emit(
        'userTyping',
        startedTyping
      );

      return setTimeout(
        () => {
          socketRef.current?.emit(
            'userTyping',
            stopedTyping
          )
        },
        TYPING_DELAY_MS);
    },
    []
  )

  return (
    <div className="App">
      <div className='custom-container'>
        <div className='window'>
          <div className='window-header'>
            <GrChat className='window-header--icon' />
            <span className='window-header--text'>WinChat</span>
            {
              isJoined
                ? <GrClose className='window-header--controls' onClick={closeChatHandler} />
                : null
            }
          </div>

          <div className='window-controls'>
            <div><u>F</u>ile</div>
            <div><u>V</u>iew</div>
            <div><u>T</u>ools</div>
            <div><u>H</u>elp</div>
          </div>

          <hr className='window-linebreak' />

          <div className="window-body">
            {
              isJoined
                ? <ChatComponent sendMessageCb={sendMessageCb} isTypingCb={isTypingCb} />
                : <LoginComponent loginCb={loginCb} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
