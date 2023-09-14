import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Trombi from '../pages/Trombi';
import Widgets from '../pages/Widgets';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
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
          } else if (route.name === 'Chat') {
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
      <Tab.Screen name={'Chat'} component={Chat} />
      <Tab.Screen name={'Profile'} component={Profile} />
    </Tab.Navigator>
  );
};

export default NavBar;
