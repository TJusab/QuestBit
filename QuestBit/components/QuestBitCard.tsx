import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Card } from '@rneui/themed';
import { QuestBit } from '../constants/QuestBit';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type QuestBitCardProps = {
  questBit: QuestBit;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>
};

const QuestBitCard: React.FC<QuestBitCardProps> = ({ questBit, navigation }) => {
  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.cardTitle}>{questBit.name}</Card.Title>
      <View>
        <Text>Reporter: {questBit.reporter}</Text>
        <Text>Description: {questBit.description}</Text>
        <Text>Assignee: {questBit.assignee}</Text>
        <Button 
          title="View Details" 
          onPress={() => {
            navigation.navigate('QuestBitDetails', {
              questBit: questBit,
            });
          }}/>
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
