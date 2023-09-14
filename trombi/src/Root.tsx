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
import {fetchThemeFromLocalStorage} from './utils/ThemeFunctions';
import {ThemeProvider} from './utils/ThemeContext';
import {useNavigation, CommonActions} from '@react-navigation/native';

const Stack = createStackNavigator();

function Root() {
  const navigation = useNavigation();
  const [_theme, setTheme] = React.useState<string>('light');

  useEffect(() => {
    fetchTokensFromLocalStorage()
      .then(tokens => {
        setTokens(tokens);
        if (tokens['masurao-token'] !== '') {
          navigation.navigate('NavBar');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'NavBar'}],
            }),
          );
        }
      })
      .catch(() => {
        navigation.navigate('Login');
      });
  }, [navigation]);

  useEffect(() => {
    fetchThemeFromLocalStorage()
      .then(theme => {
        setTheme(!theme.theme ? 'light' : theme.theme);
      })
      .catch(() => {
        setTheme('light');
      });
  }, [navigation]);

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default Root;
