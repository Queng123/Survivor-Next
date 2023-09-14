import React from 'react';
import {View, Text} from 'react-native';
import {ChannelList} from 'stream-chat-react-native';
import {useAppContext} from '../components/Chat/AppContext';
import { chatUserId } from '../components/Chat/chatConfig';

const filters = {
  members: {
    '$in': [chatUserId]
  },
};

const sort = {
  last_message_at: -1,
};

const ChannelListScreen = (props) => {
  const { setChannel } = useAppContext();
  return (
    <ChannelList
      onSelect={(channel) => {
        const { navigation } = props;
        setChannel(channel);
        navigation.navigate('PrivateChat');
      }}
      filters={filters}
      sort={sort}
    />
  );
}
export default ChannelListScreen;
