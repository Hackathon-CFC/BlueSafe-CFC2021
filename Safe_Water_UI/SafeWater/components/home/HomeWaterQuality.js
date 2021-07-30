import React, {useState} from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import globalConstant from '../../constant/globalConstant';

import styles from '../../styles/globalStyles';

const HomeWaterQualityComponent = ({navigation}) => {

    const strings = globalConstant.home_customer_labels;

    const [spots, setSpots] = useState(navigation.getParam('spots'));

    const showDetails = () => {
        navigation.navigate('WaterQualityDetails', { spots: spots });
    }
    
    return(
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingLeft: 15, paddingRight: 15, backgroundColor: 'white' }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View>
                <Text style={{ fontSize: 26, fontWeight: 'bold', marginTop: 40, color: 'black' }}>Home</Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity 
                    onPress={() => { showDetails()}}>
                    <View style={styles.borderSection} >
                        <Image source={require('../../assets/images/app-icon.png')}
                            style={{ width: 50, height: 50, marginRight: 10 }} />
                        <Text style={styles.tileText}>{strings.water_quality}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate('RaiseComplaint') }}>
                    <View style={styles.borderSection}>
                        <Image source={require('../../assets/images/complain-icon.png')}
                            style={{ width: 50, height: 50, marginRight: 10 }} />
                        <Text style={styles.tileText}>{strings.raise_complaint}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate('Complaint') }}>
                    <View style={styles.borderSection}>
                        <Image source={require('../../assets/images/my-request-icon.png')}
                            style={{ width: 50, height: 50, marginRight: 10 }} />
                        <Text style={styles.tileText}>My Requests</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>

    )
}

export default HomeWaterQualityComponent;