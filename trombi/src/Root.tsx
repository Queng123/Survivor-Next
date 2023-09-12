import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import WidgetSelector from './pages/WidgetSelector';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import PrivateChat from './pages/PrivateChat';

const Stack = createStackNavigator();

function Root() {
  return (
    // TODO: Add a Check if the user key exists if so go to NavBar else go to Login
    <Stack.Navigator
      initialRouteName="NavBar"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="NavBar" component={NavBar} />
      <Stack.Screen name="WidgetSelector" component={WidgetSelector} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PrivateChat" component={PrivateChat} />
    </Stack.Navigator>
  );
}

export default Root;
