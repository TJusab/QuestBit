import React from 'react';
import AddQuestBit from './components/AddQuestBit';
import QuestBitHome from './components/QuestBitHome';
import QuestBitDetails from './components/QuestBitDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QuestBit } from './constants/QuestBit';

export type RootStackParamList = {
  Home: undefined;
  AddQuestBit: undefined;
  QuestBitDetails: { questBit: QuestBit };
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home"
          component={QuestBitHome}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen 
          name="AddQuestBit"
          component={AddQuestBit}
          options={{title: 'Add a new QuestBit'}}
        />
        <Stack.Screen
          name="QuestBitDetails"
          component={QuestBitDetails}
          options={{title: 'QuestBit Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;