import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Trombi from '../pages/Trombi';
import Widgets from '../pages/Widgets';
import ChannelListScreen from '../pages/ChannelListScreen';
import Profile from '../pages/Profile';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useChatClient} from '../components/Chat/useChatClient';
import {useTheme} from '../utils/ThemeContext';
import {getCustomState} from '../utils/CustomFunctions';

const Tab = createBottomTabNavigator();

const NavBar = () => {
  const {clientIsReady} = useChatClient();
  const theme = useTheme().theme === 'dark' ? '-dark' : '';
  const customStyles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: getCustomState().custom[`background-1${theme}`],
      justifyContent: 'center',
    },
  });

  return clientIsReady ? (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: getCustomState().custom[`background-3${theme}`],
        },
        tabBarIcon: ({focused}) => {
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
          return (
            <Ionicons
              name={iconName}
              size={40}
              color={getCustomState().custom[`button-primary${theme}`]}
            />
          );
        },
        tabBarLabel: () => null,
      })}>
      <Tab.Screen name={'Trombi'} component={Trombi} />
      <Tab.Screen name={'Widgets'} component={Widgets} />
      <Tab.Screen name={'ChannelListScreen'} component={ChannelListScreen} />
      <Tab.Screen name={'Profile'} component={Profile} />
    </Tab.Navigator>
  ) : (
    <View style={customStyles.container}>
      <ActivityIndicator
        size="large"
        color={getCustomState().custom[`button-primary${theme}`]}
      />
    </View>
  );
};

export default NavBar;
