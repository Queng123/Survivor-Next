import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Trombi from '../pages/Trombi';
import Widgets from '../pages/Widgets';
import ChannelListScreen from '../pages/ChannelListScreen';
import Profile from '../pages/Profile';
import { Chat } from 'stream-chat-react-native';
import { CHAT_KEY } from '@env';
import { StreamChat } from 'stream-chat';

const chatClient = StreamChat.getInstance(CHAT_KEY);

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Chat client={chatClient}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: {height: 60},
          tabBarIcon: ({color, focused}) => {
            let iconName;
            if (route.name === 'Trombi') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Widgets') {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (route.name === 'ChannelListScreen') {
              iconName = focused
                ? 'chatbubble-ellipses'
                : 'chatbubble-ellipses-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={40} color={color} />;
          },
          tabBarLabel: () => null,
        })}>
        <Tab.Screen name={'Trombi'} component={Trombi} />
        <Tab.Screen name={'Widgets'} component={Widgets} />
        <Tab.Screen name={'ChannelListScreen'} component={ChannelListScreen} />
        <Tab.Screen name={'Profile'} component={Profile} />
      </Tab.Navigator>
    </Chat>
  );
};

export default NavBar;
