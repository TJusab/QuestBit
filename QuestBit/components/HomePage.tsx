import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { NativeModules } from 'react-native';

const { DbManager } = NativeModules;

const HomePage = () => {
    const [title, setTitle] = useState('');
    const [reporter, setReporter] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (text: string) => {
        setTitle(text);
    };

    const handleReporterChange = (text: string) => {
        setReporter(text);
    };

    const handleDescriptionChange = (text: string) => {
        setDescription(text);
    };

    const handleSubmit = () => {
        var questBitId = DbManager.createNewQuestBit(title, reporter);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>QuestBit Name:</Text>
            <TextInput 
                style={styles.input}
                value={title}
                onChangeText={handleTitleChange}
                placeholder='Enter the name of the QuestBit'
            />

            <Text style={styles.label}>Reporter:</Text>
            <TextInput 
                style={styles.input}
                value={reporter}
                onChangeText={handleReporterChange}
                placeholder='Enter the name of the reporter'
            />

            <Text style={styles.label}>Description</Text>
            <TextInput 
                style={styles.input}
                value={description}
                onChangeText={handleDescriptionChange}
                placeholder='Enter a description of the QuestBit'
            />

        <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16
    },
});

export default HomePage;