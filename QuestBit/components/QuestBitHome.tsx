import { NativeModules, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import React, { useState } from 'react';
import QuestBitCard from './QuestBitCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useFocusEffect } from '@react-navigation/native';

type QuestBitHomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const { DbManager } = NativeModules;

const QuestBitHome: React.FC<QuestBitHomeProps> = ({navigation}) => {
    const [questBits, setQuestBits] = useState([]);

  const fetchQuestBits = async () => {
    try {
      const jsonQuestBits = await DbManager.getAllQuestBits();
      setQuestBits(jsonQuestBits);
    } catch (error) {
      console.error('Error fetching QuestBits:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchQuestBits();
    }, [])
  );

  return (
    <ScrollView>
        {questBits.length === 0 ? (
            <Text>You have no QuestBits</Text>
        ) : (
            questBits.map((questBit, index) => (
                <QuestBitCard key={index} questBit={questBit} navigation={navigation}/>
            ))
        )}
      <Button 
        title="Add a QuestBit"
        onPress={() => navigation.navigate('AddQuestBit')}
      />
    </ScrollView>
  );
};

export default QuestBitHome;