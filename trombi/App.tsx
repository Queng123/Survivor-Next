import React from 'react';
import Root from './src/Root';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/utils/GlobalStore';
import {appInitCustomData} from './src/utils/CustomFunctions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppProvider} from './src/components/Chat/AppContext';

function App(): JSX.Element {
  appInitCustomData();

  return (
    <AppProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <Provider store={store}>
            <NavigationContainer>
              <Root />
            </NavigationContainer>
          </Provider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </AppProvider>
  );
}

export default App;
