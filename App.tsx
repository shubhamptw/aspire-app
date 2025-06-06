import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DebitCardScreen from './src/screens/DebitCardScreen';
import SpendingLimitScreen from './src/screens/SpendingLimitScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TestFlatListScreen from './src/screens/DebitCardScreen/TestFlatListScreen';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="DebitCard" component={DebitCardScreen} />
                <Stack.Screen name="SpendingLimit" component={SpendingLimitScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;