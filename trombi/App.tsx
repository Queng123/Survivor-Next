import React from 'react';
import Root from './src/Root';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/utils/GlobalStore';
import {appInitCustomData} from './src/utils/CustomFunctions';

function App(): JSX.Element {
  appInitCustomData();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
