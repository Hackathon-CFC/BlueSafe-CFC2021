import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, Image } from 'react-native';
import * as Location from 'expo-location';
import { AuthContext } from "../../App";

const CurrentLocation = ({ navigation }) => {
    const language = navigation.getParam('language');
    const { dispatch } = React.useContext(AuthContext);
    const [pin, setPin] = useState('');
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
        'Wait, we are fetching you location...'
    );
    const [locationService, setLocationServiceEnabled] = useState(false);

    useEffect(() => {
        CheckIfLocationEnabled();
        GetCurrentLocation();
    }, []);

    const CheckIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        setLocationServiceEnabled(enabled);
    };

    const GetCurrentLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission not granted',
                'Allow the app to use location service.',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        }
        let { coords } = await Location.getCurrentPositionAsync();
        let address = '';
        let pinCode = '';
        if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

            for (let item of response) {
                if (item.postalCode) {
                    pinCode = item.postalCode;
                    setPin(pinCode);
                }
                address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
                setDisplayCurrentAddress(address);
                if (address.length > 0) {
                    setTimeout(() => {
                        dispatch({
                            type: "LANGUAGE",
                            language: language,
                            location: { address: address, pin: pinCode }
                        })
                        navigation.navigate('Home');
                    }, 3000)
                } else {
                    setTimeout(() => {
                        dispatch({
                            type: "LANGUAGE",
                            language: language,
                        })
                        navigation.navigate('Home');
                    }, 5000)
                }
            }
        }
    };

    return (
        <View style={{ backgroundColor: '#0F83CE', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, height: '100%' }}>
            <Image source={require('../../assets/images/location-icon-1.png')}
                style={{ width: 60, height: 60, resizeMode: "contain"}} />
            <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginTop: 10, color: 'white' }}>{displayCurrentAddress}</Text>
        </View>
    )
}

export default CurrentLocation;