import { NativeModules, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import QuestBitCard from './QuestBitCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type QuestBitHomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const { DbManager } = NativeModules;

const QuestBitHome: React.FC<QuestBitHomeProps> = ({navigation}) => {
    const [questBits, setQuestBits] = useState([]);

  const fetchQuestBits = async () => {
    try {
      const jsonQuestBits = await DbManager.getAllQuestBits();
      console.log('QuestBits:', jsonQuestBits);
      setQuestBits(jsonQuestBits);
    } catch (error) {
      console.error('Error fetching QuestBits:', error);
    }
  };

  useEffect(() => {
    fetchQuestBits();
  }, []);

  const handleRefresh = () => {
    fetchQuestBits();
  };


  return (
    <ScrollView>
        {questBits.length === 0 ? (
            <Text>You have no QuestBits</Text>
        ) : (
            questBits.map((questBit, index) => (
                <QuestBitCard key={index} questBit={questBit}/>
            ))
        )}
      <Button 
        title="Add a QuestBit"
        onPress={() => navigation.navigate('AddQuestBit')}
      />
      <Button
        title="Refresh"
        onPress={handleRefresh}
      />
    </ScrollView>
  );
};

export default QuestBitHome;