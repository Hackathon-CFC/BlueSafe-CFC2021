import React from 'react';
import { View, Text, ScrollView} from 'react-native';
import styles from '../../styles/globalStyles';
import { Button } from 'react-native-elements';
import ImageTile from './ImageTile';

const HomeVendorSpotListComponent = ({navigation}) => {


    const spots  = navigation.getParam('spots');
    console.log("HomeVendorSpotListComponent");
    console.log(spots);

    const onAddSpot  = () => {
        navigation.navigate('HomeVendor');
    }

    return(
        <View style={{height: '100%'}}>
            <View>
                <Text style={{ fontSize: 26, fontWeight: 'bold', marginTop: '10%', marginLeft: '5%', color: 'black' }}>Home</Text>
            </View>
            <View style={{ marginLeft: 20 , marginTop: '1%', marginBottom: '0.5%' }}>
                <Text style={styles.tileText}>Recently Addded Entries</Text>
            </View>
            <View style={{height: '70%', marginRight: 30}}>
                <ScrollView contentContainerStyle={{ paddingLeft: 15, paddingRight: 15, flexGrow: 1 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={true}>
                    <View>
                        <ImageTile  spots={spots}/>
                    </View>
                </ScrollView>
            </View>
            <View style={{...styles.buttonCustom, marginTop: '3%', marginLeft:20}} >
                <Button
                    buttonStyle={styles.buttonColor}
                    onPress={onAddSpot}
                    title="Add New"
                    titleStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                />
            </View>
        </View>
    )
}

export default HomeVendorSpotListComponent;