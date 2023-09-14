import React, {useEffect} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import WidgetSelector from './pages/WidgetSelector';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import PrivateChat from './pages/PrivateChat';
import UserInfo from './components/UserInfo';
import {useNavigation} from '@react-navigation/native';
import {
  OverlayProvider
} from 'stream-chat-react-native';

const Stack = createStackNavigator();

function Root() {
  const navigation = useNavigation();
  // useEffect(() => {
  //   fetchTokensFromLocalStorage()
  //     .then(tokens => {
  //       setTokens(tokens);
  //       if (tokens['masurao-token'] !== '') {
  //         navigation.navigate('NavBar');
  //         navigation.dispatch(
  //           CommonActions.reset({
  //             index: 0,
  //             routes: [{name: 'NavBar'}],
  //           }),
  //         );
  //       }
  //     })
  //     .catch(() => {
  //       navigation.navigate('Login');
  //     });
  // }, [navigation]);

  return (
    <OverlayProvider>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="NavBar" component={NavBar} />
        <Stack.Screen name="WidgetSelector" component={WidgetSelector} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="PrivateChat" component={PrivateChat} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
      </Stack.Navigator>
    </OverlayProvider>
  );
}

export default Root;
