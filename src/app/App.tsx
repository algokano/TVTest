import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@store/index';
import styles from './App.styles';
import { TVFocusProvider } from '@tv/focus/TVFocusProvider';
import { RootNavigator } from './navigation/RootNavigator';

enableScreens();

export const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={styles.root}>
          <SafeAreaProvider>
            <TVFocusProvider>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </TVFocusProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
