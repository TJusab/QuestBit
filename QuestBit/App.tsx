import React from 'react';
import AddQuestBit from './components/AddQuestBit';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestBitHome from './components/QuestBitHome';
import { QuestBit } from './constants/QuestBit';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  QuestBitHome: undefined;
  AddQuestBit: undefined;
  QuestBitDetails: { questBit: QuestBit };
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AddQuestBit"
          component={ AddQuestBit }
          options={{ title: 'Create a QuestBit!' }}
        />
        <Stack.Screen
          name="QuestBitHome"
          component={ QuestBitHome }
          options={{ title: 'Welcome!' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;