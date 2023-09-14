import React, {useEffect} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import WidgetSelector from './pages/WidgetSelector';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import PrivateChat from './pages/PrivateChat';
import UserInfo from './components/UserInfo';
import {fetchTokensFromLocalStorage, setTokens} from './utils/TokenFunctions';
import {fetchThemeFromLocalStorage, setTheme} from './utils/ThemeFunctions';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

function Root() {
  const navigation = useNavigation();

  useEffect(() => {
    fetchTokensFromLocalStorage()
      .then(tokens => {
        setTokens(tokens);
        if (tokens['masurao-token'] !== '') {
          navigation.navigate('NavBar');
        }
      })
      .catch(() => {
        navigation.navigate('Login');
      });
  }, [navigation]);

  useEffect(() => {
    fetchThemeFromLocalStorage()
      .then(theme => {
        setTheme(theme);
      })
      .catch(() => {
        setTheme({theme: 'light'});
      });
  }, [navigation]);

  return (
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
  );
}

export default Root;
