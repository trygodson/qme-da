import React, { useEffect, useRef, useState } from 'react';
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import ChatInput from './chatinput';
import ChatMessage from './chatmessage';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import ScrollToBottom, { useAtTop } from 'react-scroll-to-bottom';
// import { css } from '@emotion/css';
import { useAuthState } from '../../context/useAuthContext';
import DefaultImage from '../../../assets/3983104.png';

const bounceAnimation = keyframes`${fadeIn}`;
const _style = styled.div`
  animation: 1s ${bounceAnimation};
`;

// const SMALL_ROOT_CSS = css({
//   height: 400,
// });

// const BIG_ROOT_CSS = css({
//   height: '61vh',
// });

function ChatBox(props) {
  console.log('props', props);
  const patient_id = props.userId;
  const doctor_id = 1;

  const [connection, setConnection] = useState(null);
  const [room, setRoom] = useState('');
  // const [roomKey, setRoomKey] = useState(props.roomKey);
  const [status, setStatus] = useState('Online');
  const [chatMessages, setChatMessages] = useState([]);
  const defaultMessagesNum = 1;
  const [messagesLimit, setMessagesLimit] = useState(defaultMessagesNum);

  // const [user] = useAuthContext();
  const { user } = useAuthState();
  user.name = 'John Doe'; // comment this later
  user.image = 'http://localhost:3000/male.jpg'; // comment this later
  const patient_name = 'Dr. Valentine'; // get value from props
  const patient_image = 'http://localhost:3000/male.jpg'; // get value from props

  // const from = { id: user.user.id, name: user.user.name, image: '' };
  // const to = {  }; // get the values from the previous

  const latestChat = useRef(null);
  latestChat.current = chatMessages;

  const joingroup = async boardId => {
    setRoom(boardId);
    if (connection.connectionStarted) {
      try {
        connection.invoke('SubscribeToOrderChat', boardId);
      } catch (e) {
        console.log(e);
      }
    } else {
      // alert('No connection to server yet.');
    }
  };

  const sendMessage = async message => {
    // const chatMessage = {
    //   user: doctor_id,
    //   message: message,
    //   referenceId: room,
    //   from: doctor_id,
    //   to: patient_id,
    //   fromname: user.name,
    //   toname: patient_name,
    //   fromimage: user.image,
    //   toimage: patient_image,
    // };

    const chatMessage = {
      user: props.you.id,
      message: message,
      referenceId: room,
      from: props.you.id,
      to: props.other.id,
      fromname: `${props.you.firstname} ${props.you.lastname}`,
      toname: `${props.other.firstname} ${props.other.lastname}`,
      fromimage: props.you.avatar,
      toimage: props.other.avatar,
    };

    console.log(chatMessage);

    const ChatStatus = {
      isTyping: false,
      message: '',
      referenceId: room,
    };

    if (connection.connectionStarted) {
      try {
        await connection.send('SendMessage', chatMessage);
        await connection.send('UserStatus', ChatStatus);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('No connection to server yet.');
    }
  };

  const MessageStatus = async () => {
    const ChatStatus = {
      isTyping: true,
      message: `${props.you.id} typing...`,
      referenceId: room,
    };

    if (connection.connectionStarted) {
      try {
        await connection.send('UserStatus', ChatStatus);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('No connection to server yet.');
    }
  };

  const handleScroll = e => {
    // console.log(e.target.scrollHeight, e.target.scrollTop, e.target.clientHeight);
    // const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    // // if (bottom) {
    // //   console.log('cool');
    // // }

    if (e.target.scrollTop == 0) {
      // console.log('Get more data when scroll hits the top');
      const newLimit = messagesLimit + defaultMessagesNum;
      console.log('newLimit', newLimit);
      setMessagesLimit(newLimit);

      axios
        .get(
          `http://onemedy.peerpro.co/api/Chat?id=${props.roomKey}&Userid=${user.user.id}&PageNumber=${newLimit}`,
        )
        .then(({ data }) => {
          // console.log('fetched', data);
          if (data.data.length > 0) {
            setChatMessages([...data.data.reverse(), ...chatMessages]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const getMessages = () => {
    axios
      .get(
        `http://onemedy.peerpro.co/api/Chat?id=${props.roomKey}&Userid=${user.user.id}&PageNumber=${messagesLimit}`,
      )
      .then(({ data }) => {
        console.log('new data => ', data.data);
        setChatMessages(data.data.reverse());
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMessages();
    console.log('changed');
  }, [props.userId, props.roomKey]);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('http://onemedy.peerpro.co/hubs/chat')
      .withAutomaticReconnect()
      .build();
    console.log(newConnection);

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      console.log(connection);
      console.log(connection.connectionStarted);
      connection
        .start()
        .then(result => {
          console.log('Connected!');

          // ONCE THIS CAHNGES, update roomKey && REFETCH PREVIOUS MESSAGES
          joingroup(props.roomKey);

          // GET CHAT MESSAGES
          getMessages();

          connection.on('Status', status => {
            const arr = status.message.split(' ');
            console.log(Number(arr[0]));
            if (arr[0] != user.user.id) {
              console.log('the other person is typing');
              if (status.isTyping) {
                setStatus(arr[1]);
              } else {
                setStatus('Online');
              }
            } else {
              console.log('you are typing');
              setStatus('Online'); // or Offline
            }
            // console.log('=>', Status);
            // if (status.message.userId != doctor_id) {
            //   setStatus(status['isTyping'] ? status['message']['status'] : '');
            // } else {
            //   console.log('your typing...');
            // }
          });

          connection.on('ReceiveOrderMessage', message => {
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);

            console.log('received message', message);

            setChatMessages(updatedChat);

            // scrollToBottom();
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    } else {
      console.log('error connecting...');
    }
  }, [connection]);

  return (
    <_style className={`chatbox ${props.type == 'big' && 'chatbox_GF5DR'}`}>
      <div className="_row container">
        <div className="info-bar">
          <img
            src={
              props.other.image == null || props.other.image.split('.').length == 1
                ? DefaultImage
                : props.other.image
            }
          />
          <i className="bx bx-exit" onClick={() => props.closeChat()}></i>
          <div className="user-info">
            <h4>
              {props.other.firstname} {props.other.lastname}
            </h4>
            <p>{status}</p>
          </div>
          <hr />
        </div>
      </div>
      <div className="_row">
        <div
          className={`top-chat-widgets ${props.type == 'big' && 'top-chat-widgets_GYR57R4'}`}
          onScroll={handleScroll}
        >
          <ScrollToBottom
            className={props.type == 'big' ? `big-root-css` : `small-root-css`}
            id="scrollableDiv"
          >
            <div className="chat">
              {chatMessages.map(_props => {
                return <ChatMessage key={uuid()} you={props.you.id} {..._props} />;
              })}
            </div>
          </ScrollToBottom>
        </div>
      </div>

      {connection != null && connection.connectionStarted ? (
        <ChatInput sendMessage={sendMessage} MessageStatus={MessageStatus} />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <i style={{ fontSize: '15px' }}>Please wait...</i>
        </div>
      )}
    </_style>
  );
}

export default ChatBox;
