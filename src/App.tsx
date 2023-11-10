import React, { useEffect } from 'react';
import './App.css';
import { Socket, io } from 'socket.io-client';
import { LoginComponent, ChatComponent } from './components'



function App() {
  const socketRef = React.useRef<Socket | null>(null);
  const [isJoined, setIsJoined] = React.useState<boolean>(false);

  useEffect(() => {

    if (!socketRef.current) socketRef.current = io('http://localhost:3001');

    // socketRef.current.emit(
    //   'findAllMessages',
    //   {},
    //   (response: ChatMessage[]) => setChatMessages(response));

    // const addMessage = (msg: ChatMessage) => {
    //   setChatMessages(prevMessages => [...prevMessages, msg])
    // }

    // socketRef.current.on('message', addMessage)

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    }
  }, [])

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
          <ChatComponent sendMessageCb={() => { console.log('SEND MESSAGE CB') }} />
          :
          <LoginComponent isJoined={isJoined} joinCb={() => { console.log('JOIN CB') }} loginCb={() => { console.log('LOGIN CB') }} />
        }


      </div>
    </div>
  );
}

export default App;
