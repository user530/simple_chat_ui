import React, { useEffect } from 'react';
import './App.css';
import { Socket, io } from 'socket.io-client';
import { LoginComponent, ChatComponent } from './components';
import { loginAttemptResponse } from './dtos';


function App() {
  const socketRef = React.useRef<Socket | null>(null);
  const [isJoined, setIsJoined] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<string[]>([]);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:3001');
    }

    socketRef.current.on('userJoined', (name) => {
      console.log('USER JOINED!', name)
      setUsers((oldUsers) => [...oldUsers, name])
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.emit('userLeft');
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
        (res: loginAttemptResponse) => {
          if (res.status === 'failed') alert(res.message)
          else {
            setIsJoined(true);
            setUsers(res.users);
          }
        });
    }, []
  )

  const sendMessage = () => {
    // socketRef.current?.emit(
    //   'createMessage',
    //   { text: messageText, author: userName.current },
    //   () => setMessageText(''));
  }

  const joinChat = (name: string) => {
    // socketRef.current?.emit(
    //   'userJoins',
    //   { name },
    //   () => setIsJoined(true));
  }

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

        {isJoined ?
          <ChatComponent users={users} sendMessageCb={() => { console.log('SEND MESSAGE CB') }} />
          :
          <LoginComponent loginCb={loginCb} />
        }


      </div>
    </div>
  );
}

export default App;
