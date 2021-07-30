import React from 'react';
import { Text, ScrollView } from 'react-native';
import styles from '../../styles/globalStyles';

const addSafeDrinkingSpotSucessComponent = ({navigation}) => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 , margin: 50}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={true}>
            <Text style={styles.tileText}>Your Details has been added</Text>
            <Text style={styles.normalText}>You will be get a confirmation email once your request is approved</Text>
        </ScrollView>
    )
}

export default addSafeDrinkingSpotSucessComponent;