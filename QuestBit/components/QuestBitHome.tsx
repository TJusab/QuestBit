import { NativeModules, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import React, { useState } from 'react';
import QuestBitCard from './QuestBitCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useFocusEffect } from '@react-navigation/native';
import { QuestBit } from '../constants/QuestBit';

type QuestBitHomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const { DbManager } = NativeModules;

const QuestBitHome: React.FC<QuestBitHomeProps> = ({navigation}) => {
    const [questBits, setQuestBits] = useState<QuestBit[]>([]);
    const [isLoading, setIsLoading] = useState(false);

  const fetchQuestBits = async () => {
    setIsLoading(true);
    try {
      const jsonQuestBits = await DbManager.getAllQuestBits();
      setQuestBits(jsonQuestBits);
    } catch (error) {
      console.error('Error fetching QuestBits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchQuestBits();
    }, [])
  );

  const handleDeleteQuestBit = (deletedKey: string) => {
    const updatedQuestBits = questBits.filter((qb) => qb.key !== deletedKey);
    setQuestBits(updatedQuestBits);
  };

  return (
    <ScrollView>
        {questBits.length === 0 ? (
            <Text>You have no QuestBits</Text>
        ) : (
            questBits.map((questBit, index) => (
                <QuestBitCard 
                key={index} 
                questBit={questBit} 
                navigation={navigation}
                onDeleteQuestBit={handleDeleteQuestBit}/>
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