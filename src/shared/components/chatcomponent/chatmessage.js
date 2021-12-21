import React from 'react';

function ChatMessage(props) {
  const you = props.you;
  return (
    <div>
      {props.from == you ? (
        <div className="mine messages">
          <div className="message">{props.message}</div>
        </div>
      ) : (
        <div className="yours messages">
          <div className="message other">{props.message}</div>
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
