import React from 'react';
import {Channel, MessageList, MessageInput} from 'stream-chat-react-native';
import {useAppContext} from '../components/Chat/AppContext';

const PrivateChat = () => {
  const {channel} = useAppContext();
  const messageAvatar = () => null;
  return (
    <Channel channel={channel}
      MessageAvatar={messageAvatar}
      ReactionList={() => null}
    >
      <MessageList />
      <MessageInput />
    </Channel>
  );
};
export default PrivateChat;
