import React, { useState } from 'react';
import { View, StyleSheet, NativeModules} from 'react-native';
import { Input } from '@rneui/themed';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

const { DbManager } = NativeModules;

type AddQuestBitNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddQuestBit'
>;

type Props = {
  navigation: AddQuestBitNavigationProp;
};

const AddQuestBit: React.FC<Props> = ({ navigation }) => {
    const [questBit, setQuestBit] = useState({
        name: '',
        reporter: '',
        description: '',
        assignee: '',
    });

    const handleSaveQuestBit = () => {
        DbManager.createNewQuestBit(questBit.name, questBit.reporter, questBit.description, questBit.assignee);
        console.log('QuestBit data:', questBit);
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
                    onPress={() => navigation.navigate('QuestBitHome')} 
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