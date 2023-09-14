import React from 'react';
import {ChannelList} from 'stream-chat-react-native';
import {useAppContext} from '../components/Chat/AppContext';
import {useEffect, useState} from 'react';
import {getCurrentUserInfos} from '../utils/getCurrentUserInfos';

const ChannelListScreen = props => {
  const [chatUserId, setChatUserId] = useState<any>(null);
  const {setChannel} = useAppContext();
  const filters = chatUserId
    ? {
        members: {
          $in: [chatUserId],
        },
      }
    : {};

  const sort = {
    last_message_at: -1,
  };
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const userInformation = await getCurrentUserInfos();

        if (userInformation) {
          const chatUserId = `${userInformation.name}-${userInformation.surname}`;
          setChatUserId(chatUserId);
        }
      } catch (error) {
        console.error(error);
      }
    };

    initializeChat();
  }, []);

  return (
    <ChannelList
      onSelect={channel => {
        const {navigation} = props;
        setChannel(channel);
        navigation.navigate('PrivateChat');
      }}
      filters={filters}
      sort={sort}
    />
  );
};
export default ChannelListScreen;
