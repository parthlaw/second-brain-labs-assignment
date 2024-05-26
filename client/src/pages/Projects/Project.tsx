// src/components/ChatScreen.jsx
import React, { useState } from 'react';

const ProjectScreen = () => {
  const [messages, setMessages] = useState([
    { sender: 'other', text: 'Hello! How can I help you today?' },
    { sender: 'me', text: 'I have a question about your services.' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { sender: 'me', text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-base-200">
      <div className="flex-1 p-4 overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat ${message.sender === 'me' ? 'chat-end' : 'chat-start'}`}
          >
            <div className={`chat-bubble ${message.sender === 'me' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-base-100">
        <div className="flex space-x-2">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectScreen;
