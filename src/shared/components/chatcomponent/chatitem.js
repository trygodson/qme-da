import React, { useContext } from 'react';

import DefaultImage from '../../../assets/3983104.png';
function ChatItem({ ...props }) {
  const id = props.fromId == props.myId ? props.toId : props.fromId;
  const name = props.fromId == props.myId ? props.toName : props.fromName;
  const image = props.fromId == props.myId ? props.toImage : props.fromImage;
  return (
    <div
      className="subchat"
      onClick={() => {
        if (props.type == 'small') {
          props.startChat(
            props.fromId == props.myId ? props.toId : props.fromId,
            props.referenceId,
            { id, name, image },
          );
        } else {
          props.openChat(
            props.fromId == props.myId ? props.toId : props.fromId,
            props.referenceId,
            { id, name, image },
          );
        }
      }}
    >
      <img src={image == null || image.split('.').length == 1 ? DefaultImage : image} />
      <b>20 min.</b>
      <div className="info">
        <h4>{name == null ? 'ErrorName' : name}</h4>
        <p>{props.lastMessage == null ? 'Click to continue chatting...' : props.lastMessage}</p>
        {/* {props.unread_messages > 0 && (
          <span className="outer">
            <span className="inner">{props.unread_messages}</span>
          </span>
        )} */}

        {/* <div class={`status ${props.online ? 'online' : 'offline'}`}></div> */}
      </div>
      <hr />
    </div>
  );
}

export default ChatItem;
