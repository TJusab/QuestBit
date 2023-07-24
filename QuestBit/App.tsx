// import React from 'react';
// import {NativeModules, Button, View} from 'react-native';
// const {DbManager} = NativeModules;

// const App = () => {
//   var nameQuestBit = 'Tayba QuestBit';

//   const onPress = () => {
//     var questBitId = DbManager.createNewQuestBit(nameQuestBit, 'Tayba');
//   };
  
//   return (
    
//     <View>
//       <Button
//         title="Click to invoke your native module!"
//         color="#0099FF"
//         onPress={onPress}
//       />
//     </View>
//   );
// };

// export default App;

import React from 'react';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <HomePage />
  )
}

export default App;