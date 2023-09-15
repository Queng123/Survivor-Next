import React from 'react';
import {ChannelList} from 'stream-chat-react-native';
import {useAppContext} from '../components/Chat/AppContext';
import {useEffect, useState} from 'react';
import {getCurrentUserInfos} from '../utils/getCurrentUserInfos';
import {Text, StyleSheet} from 'react-native';
import {useTheme} from '../utils/ThemeContext';
import {View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

const ChannelListScreen = props => {
  const custom = useSelector((state: any) => state.custom.customState.custom);
  const [chatUserId, setChatUserId] = useState<any>(null);
  const {setChannel} = useAppContext();
  const theme = useTheme().theme === 'dark' ? '-dark' : '';
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
  const styles = StyleSheet.create({
    title: {
      color: custom[`title-primary${theme}`],
      marginBottom: 8,
    },
    text: {
      color: custom[`text-primary${theme}`],
      alignSelf: 'flex-start',
    },
    container: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: 16,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      backgroundColor: custom[`background-1${theme}`],
    },
  });
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

  const CustomChannelPreview = ({channel, latestMessagePreview, onSelect}) => {
    const text =
      latestMessagePreview.previews[latestMessagePreview.status].text;
    const channelNameParts = channel.data.name.split('-');
    const lastPart = channelNameParts[channelNameParts.length - 1];
    return (
      <TouchableOpacity onPress={() => onSelect(channel)}>
        <View style={styles.container}>
          <Text style={styles.title}>{lastPart}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleNavigation = async channel => {
    setChannel(channel);
    props.navigation.navigate('PrivateChat');
  };

  return (
    <ChannelList
      Preview={props => (
        <CustomChannelPreview {...props} onSelect={handleNavigation} />
      )}
      filters={filters}
      sort={sort}
      refreshing={true}
    />
  );
};
export default ChannelListScreen;
