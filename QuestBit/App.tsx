import React from 'react';
import AddQuestBit from './android/app/components/AddQuestBit';
import QuestBitHome from './android/app/components/QuestBitHome';
import QuestBitDetails from './android/app/components/QuestBitDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  AddQuestBit: undefined;
  QuestBit: undefined;
};

interface QuestBit {
  name: string;
  reporter: string;
  description: string;
  assignee: string;
}

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
          name="QuestBit"
          component={QuestBitDetails}
          options={{title: 'QuestBit'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;