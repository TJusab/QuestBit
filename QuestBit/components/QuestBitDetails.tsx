import React, { useState } from 'react';
import { View, Alert, NativeModules } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { QuestBit } from '../constants/QuestBit';
import { useRoute } from '@react-navigation/native';
import { Input } from '@rneui/themed';

const { DbManager } = NativeModules;

const QuestBitDetails = () => {
    const route = useRoute();
    const { questBit } = route.params as { questBit: QuestBit};
    const [editedQuestBit, setEditedQuestBit] = useState(questBit);

    const handleSaveChanges = () => {
        DbManager.updateQuestBit(questBit.key, editedQuestBit.name, editedQuestBit.reporter, 
            editedQuestBit.description, editedQuestBit.assignee);

        Alert.alert(
            'QuestBit Saved',
            'Your changes have been saved successfully!',
            [
              {
                text: 'OK',
              },
            ],
            { cancelable: false }
          );
    }

    return (
        <View>
            <Text>In View Details page!</Text>
            <Text>Name:</Text>
            <Input
                value={editedQuestBit.name}
                onChangeText={(text) => setEditedQuestBit({ ...editedQuestBit, name: text })}
            />
            <Text>Reporter:</Text>
            <Input
                value={editedQuestBit.reporter}
                onChangeText={(text) => setEditedQuestBit({ ...editedQuestBit, reporter: text })}
            />
            <Text>Description:</Text>
            <Input
                value={editedQuestBit.description}
                onChangeText={(text) => setEditedQuestBit({ ...editedQuestBit, description: text })}
            />
            <Text>Assignee:</Text>
            <Input
                value={editedQuestBit.assignee}
                onChangeText={(text) => setEditedQuestBit({ ...editedQuestBit, assignee: text })}    
            />
            <Button
                title="Save changes"
                onPress={handleSaveChanges}
            />
        </View>
    );
}

export default QuestBitDetails;