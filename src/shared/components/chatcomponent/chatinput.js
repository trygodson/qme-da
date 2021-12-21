import React, { useState } from 'react';

function ChatInput({ ...props }) {
  const [message, setMessage] = useState('');

  const onMessageUpdate = e => {
    setMessage(e.target.value);
    props.MessageStatus();
  };

  const onClickHandler = () => {
    const isMessageProvided = message && message !== '';

    if (isMessageProvided) {
      props.sendMessage(message);
    } else {
      // alert('Please insert an user and a message.');
    }
    setMessage('');
  };

  return (
    <div className="_row">
      <div className="bottom-chat-widgets">
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={onMessageUpdate}
          onKeyDown={e => {
            console.log(e.key);
            if (e.key === 'Enter') {
              onClickHandler();
            }
          }}
        />
        <button onClick={onClickHandler}>
          <i className="bx bx-send"></i>
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
