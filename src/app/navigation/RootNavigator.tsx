import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '@features/home/screens/HomeScreen';
import { PlayerScreen } from '@features/player/screens/PlayerScreen';

export type RootStackParamList = {
  Home: undefined;
  Player: {
    initialVideoId?: string;
  };
};

export const SCREENS: { [K in keyof RootStackParamList]: K } = {
  Home: 'Home',
  Player: 'Player',
} as const;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.Home}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREENS.Home} component={HomeScreen} />
      <Stack.Screen name={SCREENS.Player} component={PlayerScreen} />
    </Stack.Navigator>
  );
};
