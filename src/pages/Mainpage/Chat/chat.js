import React, { useState, createContext, useContext, useEffect } from 'react';
import ChatBox from '../../../shared/components/chatcomponent/chatbox';
import ChatList from '../../../shared/components/chatcomponent/chatlist';
import './chat.scss';
import _chatmessages from '../../../assets/jsondata/chat_messages.json';
import PrechatInfo from './prechatinfo';
import { useAuthState } from '../../../shared/context/useAuthContext';
import useUserService from '../../../shared/hooks/api/useUserService';

export const MainChatActionContext = createContext({});

function Chat() {
  const [userId, setUserId] = useState(null);
  const [chat, setChat] = useState(false); // change to default 'false'
  const [roomKey, setRoomKey] = useState(null);
  const [user, setUser] = useState({ name: 'John Doe', image: 'http://localhost:3000/male.jpg' });
  const [chatMessages, setChatMessages] = useState(_chatmessages);
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

  const openChat = (user_id, roomKey, user) => {
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

  const action = useContext(MainChatActionContext);
  action.openChat = openChat;

  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <div className="main__greeting">
            <h1>Chat</h1>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
            <div className="chat_list chat_list_64E464 container">
              <ChatList type={`big`} openChat={openChat} />
            </div>
          </div>
          <div className="col-lg-9 col-md-12 col-sm-12 laptop-chat">
            {roomKey != null && you != null && other != null ? (
              <ChatBox
                user={user}
                chat_messages={chatMessages}
                closeChat={closeChat}
                type={`big`}
                userId={userId}
                roomKey={roomKey}
                you={you}
                other={other}
              />
            ) : (
              <PrechatInfo />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Chat;
