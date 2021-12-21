import React, { useEffect, useState } from 'react';
// import _chatlist from '../../../assets/jsondata/chat_list.json';
import _chatlist from '../../../assets/jsondata/chat_messages_demo.json';
import ChatItem from './chatitem';
import { bounceInRight, fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { useAuthState } from '../../context/useAuthContext';

function ChatList({ ...props }) {
  const bounceAnimation = keyframes`${props.type == 'small' ? bounceInRight : ''}`;
  const _style = styled.div`
    animation: 1s ${bounceAnimation};
  `;
  const { user } = useAuthState(); // to get doctor id
  // user.id = 1; // comment this
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://onemedy.peerpro.co/api/Chat/getchatlist?id=${user.user.id}`)
      .then(({ data }) => {
        console.log(`http://onemedy.peerpro.co/api/Chat/getchatlist?id=${user.user.id}`, data);
        setChatList(data);
      });
  }, []);

  return chatList.map(chats => (
    <_style>
      <ChatItem
        key={chats.id}
        startChat={props.startChat}
        openChat={props.openChat}
        {...chats}
        {...props}
        myId={user.user.id}
      />
    </_style>
  ));
}

export default ChatList;
