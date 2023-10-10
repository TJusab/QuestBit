import React, { useState } from 'react';
import { View, StyleSheet, NativeModules, Alert } from 'react-native';
import { Input } from '@rneui/themed';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { QuestBit } from '../constants/QuestBit';

type AddQuestBitProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'AddQuestBit'>
};

const { DbManager } = NativeModules;

const AddQuestBit: React.FC<AddQuestBitProps> = ({navigation}) => {
    const [questBit, setQuestBit] = useState<QuestBit>({
        key: '',
        name: '',
        reporter: '',
        description: '',
        assignee: '',
    });

    const handleSaveQuestBit = () => {
        DbManager.createNewQuestBit(questBit.name, questBit.reporter, questBit.description, questBit.assignee);
        Alert.alert(
            'QuestBit Added',
            'A new QuestBit has been added successfully!',
            [
              {
                text: 'OK',
              },
            ],
            { cancelable: false }
          );
    };

    return (
        <View style={styles.container}>
            <Input 
                label="QuestBit Name"
                leftIcon={<Icon name="rename-box" size={20} />}
                placeholder="Enter QuestBit Name"
                onChangeText={(text) => setQuestBit({ ...questBit, name: text})}
            />
            <Input 
                label="QuestBit Reporter"
                leftIcon={<Icon name="account-outline" size={20} />}
                placeholder="Enter Reporter Name"
                onChangeText={(text) => setQuestBit({ ...questBit, reporter: text})}
            />
            <Input 
                label="QuestBit Description"
                leftIcon={<Icon name="text-box-outline" size={20} />}
                placeholder="Enter QuestBit Description"
                onChangeText={(text) => setQuestBit({ ...questBit, description: text})}
            />
            <Input 
                label="QuestBit Assignee"
                leftIcon={<Icon name="account-outline" size={20} />}
                placeholder="Enter Assignee Name"
                onChangeText={(text) => setQuestBit({ ...questBit, assignee: text})}
            />
            <View style={styles.buttonContainer}>
                <Button 
                    onPress={handleSaveQuestBit} 
                    title="Add a QuestBit"
                    buttonStyle={styles.addButton}
                />
                <Button 
                    onPress={() => navigation.navigate('Home')} 
                    title="Go back to Home" 
                    buttonStyle={styles.goBackButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    addButton: {
        backgroundColor: '#4caf50',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    goBackButton: {
        backgroundColor: '#f44336',
        marginHorizontal: 20,
    }
});

export default AddQuestBit;