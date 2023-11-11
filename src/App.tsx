import React, { useEffect } from 'react';
import './App.css';
import { Socket, io } from 'socket.io-client';
import { LoginComponent, ChatComponent } from './components';
import { LoginAttemptResponse, NewMessageRequest, NewMessageResponse } from './dtos';
import { useAppDispatch } from './hooks/chatStoreHooks';
import { addUser, removeUser, setUsers } from './store/reducers/slices';
import { addMessage, setMessages } from './store/reducers/slices/messagesSlice';


function App() {
  const socketRef = React.useRef<Socket | null>(null);
  const [isJoined, setIsJoined] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:3001');
    }

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

    return () => {
      if (socketRef.current) {
        socketRef.current?.disconnect();
        socketRef.current = null;
      }
    }
  }, [])

  const loginCb = React.useCallback(
    (name: string) => {
      socketRef.current?.emit(
        'userLoginAttempt',
        { name },
        (res: LoginAttemptResponse) => {
          if (res.status === 'failed') alert(res.message)
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

  const isTyping = () => {
    // socketRef.current?.emit(
    //   'userTyping',
    //   { isTyping: true });

    // typingTimeout.current = setTimeout(
    //   () => socketRef.current?.emit('userTyping', { isTyping: false }),
    //   2000
    // )
  }

  return (
    <div className="App">
      <div className="chat">

        {
          isJoined ?
            <ChatComponent sendMessageCb={sendMessageCb} />
            :
            <LoginComponent loginCb={loginCb} />
        }

      </div>
    </div>
  );
}

export default App;
