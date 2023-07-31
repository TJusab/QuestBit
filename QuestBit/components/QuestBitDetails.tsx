import React from 'react';
import { View, Text } from 'react-native';
import { NativeModules } from 'react-native';

const { DbManager } = NativeModules;

const QuestBitDetails = () => {
  return (
    <View>
      <Text>Name: {questBit.name}</Text>
      <Text>Reporter: {questBit.reporter}</Text>
      <Text>Description: {questBit.description}</Text>
      <Text>Assignee: {questBit.assignee}</Text>
    </View>
  );
};

export default QuestBitDetails;
