import React from 'react';
import {NativeModules, Button, View} from 'react-native';
const {DbManager} = NativeModules;

const App = () => {
  var nameQuestBit = 'First QuestBit';

  const onPress = () => {
    var questBitId = DbManager.createNewQuestBit(nameQuestBit, 'Julia');
  };
  
  return (
    
    <View>
      <Button
        title="Click to invoke your native module!"
        color="#0099FF"
        onPress={onPress}
      />
    </View>
  );
};

export default App;