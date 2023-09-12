import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { QuestBit } from '../constants/QuestBit';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

const QuestBitDetails = () => {
    const route = useRoute();
    const { questBit } = route.params as { questBit: QuestBit};

    return (
        <View>
           <Text>In View Details page!</Text>
           <Text>Name: {questBit.name}</Text>
           <Text>Reporter: {questBit.reporter}</Text>
           <Text>Description: {questBit.description}</Text>
           <Text>Assignee: {questBit.assignee}</Text>
        </View>
    );
}

export default QuestBitDetails;