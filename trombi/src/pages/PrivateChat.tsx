import React from 'react';
import {
  Channel,
  MessageList,
  MessageInput
} from 'stream-chat-react-native';
import { useAppContext } from "../components/Chat/AppContext";


const PrivateChat = (props) => {
    const { channel } = useAppContext();
    return (
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    );
  }
export default PrivateChat;
