import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, NativeModules, Alert } from 'react-native';
import { Card } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import { QuestBit } from '../constants/QuestBit';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

const { DbManager } = NativeModules;

type QuestBitCardProps = {
  questBit: QuestBit;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  onDeleteQuestBit: (deletedKey: string) => void;
}

const QuestBitCard: React.FC<QuestBitCardProps> = ({ questBit, navigation, onDeleteQuestBit }) => {
  const dropdownOptions = ['View Details', 'Delete questbit'];
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const iconRef = useRef<TouchableOpacity | null>(null);

  const toggleDropdown = () => {
    if (iconRef.current) {
      iconRef.current.measureInWindow((x, y, width, height) => {
        setDropdownPosition({ top: height, left: width + (x / 2)});
        setIsDropdownVisible(!isDropdownVisible);
      });
    }
  };

  const handleDropdownSelect = async (option: string) => {
    setSelectedOption(option);
    if (option === 'View Details') {
      navigation.navigate('QuestBitDetails', {
        questBit: questBit,
      });
    } else if (option === 'Delete questbit') {
      try {
        Alert.alert(
          'Delete QuestBit',
          'Are you sure you want to delete the QuestBit?',
          [
            {
              text: 'NO', 
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: async () => {
                await DbManager.deleteQuestBit(questBit.key);
                onDeleteQuestBit(questBit.key);
              },
            },
          ],
          { cancelable: true }
        );
      } catch (error) {
        console.error('Error deleting QuestBit:', error);
      }
          
    }
  };

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.cardTitle}>{questBit.name}</Card.Title>
      <View>
        <Text>Reporter: {questBit.reporter}</Text>
        <Text>Description: {questBit.description}</Text>
        <Text>Assignee: {questBit.assignee}</Text>
        <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.dropdownButton}
          ref={(ref) => (iconRef.current = ref)}
        >
          <Icon name="ellipsis-h" size={24} color="#000" />
        </TouchableOpacity>
        {isDropdownVisible && (
          <View style={[styles.dropdown, { top: dropdownPosition.top, left: dropdownPosition.left }]}>
            {dropdownOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownOption}
                onPress={() => {
                  handleDropdownSelect(option);
                  setIsDropdownVisible(false);
                }}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
  },
  dropdownButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownOption: {
    paddingVertical: 5,
  },
});

export default QuestBitCard;
