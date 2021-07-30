import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import globalConstant from '../../constant/globalConstant';
import styles from '../../styles/globalStyles';

const HomeVendorComponent = ({navigation}) => {

    const strings =  globalConstant.home_vendor_labels;

    return(
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingLeft: 15, paddingRight: 15, backgroundColor: 'white' }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View>
                <Text style={{ fontSize: 26, fontWeight: 'bold', marginTop: 40, color: 'black' }}>Home</Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('addSafeDrinkingSpot')}>
                    <View style={styles.borderSection} >
                        <Image source={require('../../assets/images/safe-drinking-water.png')}
                            style={{ width: 60, height: 60, marginRight: 5 }} />
                        <Text style={styles.tileText}>{strings.safe_drinking}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('addSafeDrinkingSpot')}>
                    <View style={styles.borderSection}>
                        <Image source={require('../../assets/images/portable-water-icon.png')}
                            style={{ width: 60, height: 60, marginRight: 5 }} />
                        <Text style={styles.tileText}>{strings.portable_water}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('addSafeDrinkingSpot')}>
                    <View style={styles.borderSection}>
                        <Image source={require('../../assets/images/lake-water-icon.png')}
                            style={{ width: 60, height: 60, marginRight: 5 }} />
                        <Text style={styles.tileText}>{strings.lake_water}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('addSafeDrinkingSpot')}>
                    <View style={styles.borderSection}>
                        <Image source={require('../../assets/images/water-cooler.png')}
                            style={{ width: 60, height: 60, marginRight: 5 }} />
                        <Text style={styles.tileText}>{strings.water_cooler}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default HomeVendorComponent;