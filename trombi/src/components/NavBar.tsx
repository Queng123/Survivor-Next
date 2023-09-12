import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Trombi from '../pages/Trombi';
import Widgets from '../pages/Widgets';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';

import '../../locales/index';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

const NavBar = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {height: 80},
        tabBarLabelStyle: {
          fontSize: 16,
          color: 'blue',
        },
        tabBarIcon: ({color, size, focused}) => {
          let iconName;
          if (route.name === t('trombi.title')) {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === t('widgets.title')) {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === t('chat.title')) {
            iconName = focused
              ? 'chatbubble-ellipses'
              : 'chatbubble-ellipses-outline';
          } else if (route.name === t('profile.title')) {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name={t('trombi.title')} component={Trombi} />
      <Tab.Screen name={t('widgets.title')} component={Widgets} />
      <Tab.Screen name={t('chat.title')} component={Chat} />
      <Tab.Screen name={t('profile.title')} component={Profile} />
    </Tab.Navigator>
  );
};

export default NavBar;
