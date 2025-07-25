import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import PokemonCardScreen from '../screens/PokemonCardScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Pokemons' }}
      />
      <Stack.Screen
        name="PokemonCard"
        component={PokemonCardScreen}
        options={{ title: 'Information about Pokemon' }}
      />
    </Stack.Navigator>
  );
}
