import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Card } from '@rneui/themed';

interface QuestBit {
  name: string;
  reporter: string;
  description: string;
  assignee: string;
}

const QuestBitCard: React.FC<{ questBit: QuestBit }> = ({ questBit }) => {
  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.cardTitle}>{questBit.name}</Card.Title>
      <View>
        <Text>Reporter: {questBit.reporter}</Text>
        <Text>Description: {questBit.description}</Text>
        <Text>Assignee: {questBit.assignee}</Text>
        <Button title="View Details" onPress={() => console.log('View details button clicked!') }/>
      </View>
    </Card>
  );
};

const styles = {
  card: {
    marginBottom: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
  },
};

export default QuestBitCard;
