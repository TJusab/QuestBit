import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Card } from '@rneui/themed';
import { QuestBit } from '../constants/QuestBit';

const QuestBitCard: React.FC<{ questBit: QuestBit }> = ({ questBit }) => {
  return (
    <Card>
      <Card.Title>{questBit.name}</Card.Title>
      <Card.Divider />
      <Text>Reporter: {questBit.reporter}</Text>
      <Text>Description: {questBit.description}</Text>
      <Button
        title="View Details"
        onPress={() => navigation.navigate('QuestBitDetails', { questBit })}
      />
    </Card>
  );
};

const QuestBitHome = ({ navigation }) => {
  return (
    <View>
      {dummyQuestBits.length > 0 ? (
        dummyQuestBits.map((questBit) => (
          <QuestBitCard key={questBit.id} questBit={questBit} />
        ))
      ) : (
        <Text>You have no QuestBits</Text>
      )}
      <Button
        title="Add a QuestBit"
        onPress={() => navigation.navigate('AddQuestBit')}
      />
    </View>
  );
};

export default QuestBitHome;
