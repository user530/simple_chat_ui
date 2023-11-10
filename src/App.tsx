import React, { useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';

interface ChatMessage {
  author: string;
  text: string;
}

function App() {
  const socket = io('http://localhost:3001');

  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = React.useState<string>('');

  useEffect(() => {
    socket.emit('findAllMessages', {}, (response: ChatMessage[]) => {
      setChatMessages(response);
    });

    const addMessage = (msg: ChatMessage) => {
      setChatMessages(prevMessages => [...prevMessages, msg])
    }

    socket.on('message', addMessage)

    return () => {
      socket.off('message', addMessage);
    }
  }, [])

  const sendMessage = () => socket.emit('createMessage', { text: messageText },
    () => setMessageText(''))

  return (
    <div className="App">
      <div className="chat">
        <div className="chat-container" >
          {chatMessages.map((message, ind) => <div className='message p-2' key={ind}>[{message.author}]: {message.text}</div>)}
        </div>

        <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
        <input type="button" value="Send" onClick={sendMessage} />
      </div>
    </div>
  );
}

export default App;
