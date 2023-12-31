import React from 'react';
import Root from './src/Root';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/utils/GlobalStore';
import {appInitCustomData} from './src/utils/CustomFunctions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppProvider} from './src/components/Chat/AppContext';
import {ThemeProvider} from './src/utils/ThemeContext';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_CLIENT_ID} from '@env';

function App(): JSX.Element {
  appInitCustomData();
  GoogleSignin.configure({
    webClientId: `${GOOGLE_CLIENT_ID}`,
    scopes: [
      'email',
      'profile',
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube.force-ssl',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.readonly',
    ],
    offlineAccess: true,
    forceCodeForRefreshToken: false,
  });
  return (
    <AppProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <ThemeProvider>
            <Provider store={store}>
              <NavigationContainer>
                <Root />
              </NavigationContainer>
            </Provider>
          </ThemeProvider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </AppProvider>
  );
}

export default App;
