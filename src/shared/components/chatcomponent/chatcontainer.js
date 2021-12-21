import React, { useState, createContext, useContext, useEffect } from 'react';
import './chat.scss';
import _chatlist from '../../../assets/jsondata/chat_list.json';
import Chatbox from './chatbox';
import ChatList from './chatlist';
import useUserService from '../../hooks/api/useUserService';
// export const ChatActionContext = createContext({});
import { useAuthState } from '../../context/useAuthContext';

function ChatContainer() {
  const [userId, setUserId] = useState(null);
  const [chat, setChat] = useState(false); // change to default 'false'
  const [roomKey, setRoomKey] = useState(null);
  const [user, setUser] = useState({ name: 'John Doe', image: 'http://localhost:3000/male.jpg' });
  // const [chatMessages, setChatMessages] = useState([]);
  const { mutateAsync: getUserById } = useUserService.useGetUserByIdService();
  const { user: _user } = useAuthState();
  const [you, setYou] = useState({});
  const [other, setOther] = useState({});

  async function getUserByIdFuncCall(id, type) {
    const response = await getUserById(id);
    if (type == 'you') {
      setYou(response);
    } else {
      setOther(response);
    }
  }

  const startChat = (user_id, roomKey, user) => {
    setUserId(user_id);
    setRoomKey(roomKey);
    // use roomKey and get both user objects
    getUserByIdFuncCall(_user.user.id, 'you');
    getUserByIdFuncCall(user.id, 'other');
    setUser(user);
    setChat(true);
  };

  const closeChat = () => {
    setUserId(null);
    setChat(false);
  };

  // const action = useContext(ChatActionContext);
  // action.startChat = startChat;

  return (
    <div className="chat_list">
      {!chat ? (
        <ChatList type={`small`} startChat={startChat} />
      ) : (
        <Chatbox
          user={user}
          closeChat={closeChat}
          type={`small`}
          userId={userId}
          roomKey={roomKey}
          you={you}
          other={other}
        />
      )}
    </div>
  );
}

export default ChatContainer;
