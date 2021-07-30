import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import globalConstant from '../../constant/globalConstant';

import styles from '../../styles/globalStyles';

const HomeCustomerComponent = ({navigation}) => {

    const strings = globalConstant.home_customer_labels;
    const spots  = navigation.getParam('spots');
    
    console.log("HomeCustomerComponent");

    const showSpots = (spotType) => {
        navigation.navigate('Spots', { spots: spots })
    };
    
    return(
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingLeft: 15, paddingRight: 15 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View>
                <Text style={{ fontSize: 26, fontWeight: 'bold', marginTop: 40, color: 'black' }}>Home</Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity 
                    onPress={() => { showSpots('Drinking Water')}}>
                    <View style={styles.borderSection} >
                        <Image source={require('../../assets/images/safe-drinking-water.png')}
                            style={{ width: 60, height: 60, marginRight: 5 }} />
                        <Text style={styles.tileText}>{strings.safe_drinking}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { showSpots('Portable Water') }}>
                    <View style={styles.borderSection}>
                        <Image source={require('../../assets/images/portable-water-icon.png')}
                            style={{ width: 60, height: 60, marginRight: 5 }} />
                        <Text style={styles.tileText}>{strings.portable_water}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { showSpots('Lake Water') }}>
                    <View style={styles.borderSection}>
                        <Image source={require('../../assets/images/lake-water-icon.png')}
                            style={{ width: 60, height: 60, marginRight: 5 }} />
                        <Text style={styles.tileText}>{strings.lake_water}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>

    )
}

export default HomeCustomerComponent;