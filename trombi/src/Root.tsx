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
import {Chat, OverlayProvider} from 'stream-chat-react-native';
import {CHAT_KEY} from '@env';
import {StreamChat} from 'stream-chat';
import {CommonActions} from '@react-navigation/native';
import {fetchTokensFromLocalStorage, setTokens} from './utils/TokenFunctions';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {fetchThemeFromLocalStorage} from './utils/ThemeFunctions';
import {useTheme} from './utils/ThemeContext';
import {fetchLanguageFromLocalStorage} from './utils/LanguageFunctions';
import {useTranslation} from 'react-i18next';
import {getCustomState} from './utils/CustomFunctions';

const chatClient = StreamChat.getInstance(CHAT_KEY);

const Stack = createStackNavigator();

function Root() {
  const navigation = useNavigation();
  const {setTheme} = useTheme();
  const {i18n} = useTranslation();

  useEffect(() => {
    fetchTokensFromLocalStorage()
      .then(tokens => {
        setTokens(tokens);
        if (tokens['masurao-token'] !== '') {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'NavBar'}],
            }),
          );
        } else {
          navigation.navigate('Login');
        }
      })
      .catch(() => {});
  }, [navigation]);
  useEffect(() => {
    fetchThemeFromLocalStorage()
      .then(theme => {
        if (
          theme.theme === null ||
          theme.theme === undefined ||
          theme.theme === 'light'
        ) {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      })
      .catch(() => {});
  }, [setTheme]);

  useEffect(() => {
    fetchLanguageFromLocalStorage()
      .then(language => {
        i18n.changeLanguage(language.language);
      })
      .catch(() => {
        i18n.changeLanguage(
          getCustomState().custom['default-language'] === 'french'
            ? 'fr'
            : 'en',
        );
      });
  }, [navigation, i18n]);

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
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
      </Chat>
    </OverlayProvider>
  );
}

export default Root;
