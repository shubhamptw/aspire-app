import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DebitCardScreen from './src/screens/DebitCardScreen';
import SpendingLimitScreen from './src/screens/SpendingLimitScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="DebitCard" component={DebitCardScreen} />
          <Stack.Screen name="SpendingLimit" component={SpendingLimitScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
};

export default App;