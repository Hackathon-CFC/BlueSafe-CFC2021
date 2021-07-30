import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, ScrollView } from 'react-native';
import { AuthContext } from "../../App";
import useAPI from '../../service/apiService';

const Home = ({ navigation }) => {

    let locateMarkers = [];
    locateMarkers = navigation.getParam('locateMarkers');
    const [showLoader, setShowLoader] = useState(true);
    const { state: authState } = React.useContext(AuthContext);
    const { postRequest, ENDPOINTS } = useAPI();

    const getSpots = () => {
        postRequest(ENDPOINTS.getSpot, { pin: '122006' }).then(result => {
            setShowLoader(false);
            let markersData = [];
            if (result && result.length) {
                result.map(data => {
                    let marker = {};
                    if (data.lat && data.long) {
                        Object.assign(marker, {
                            title: data.name,
                            id: data._id,
                            description: data.address,
                            coordinates: {
                                latitude: parseFloat(data.lat),
                                longitude: parseFloat(data.long)
                            }
                        })
                        markersData.push(marker);
                    }
                })
                if (authState.category === 'Water Quality') {
                    navigation.navigate('HomeWaterQuality', { spots: result });
                } else if (authState.category === 'Safe Drinking Water') {
                    navigation.navigate('Map', { markers: locateMarkers && locateMarkers.length ? locateMarkers : markersData, spots: result, currentLocation: {} });
                } else if (authState.category == 'Add Site') {
                    navigation.navigate('HomeVendorSpot', { spots: result });
                } else if (authState.category === 'Approve Site') {
                    navigation.push('Admin', { spots: result });
                } else {
                    navigation.navigate('HomeCustomer', { spots: result })
                }
            } else {
                navigation.navigate('HomeVendor');
            }
        })
            .catch(error => {
                setShowLoader(false);
                console.log(error.message);
            });
    }

    const onFocus = (payload) => {
        setShowLoader(true);
        getSpots();
    }

    useEffect(() => {
        const navigationSubscription = navigation.addListener(
            'didFocus',
            onFocus
        );
        getSpots();
        return () => {
            navigationSubscription.remove();
        }
    }, []);

    
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 5, paddingLeft: 15, paddingRight: 15 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={{ fontSize: 26, fontWeight: 'bold', marginTop: 25, color: 'black' }}>Home</Text>
                    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
                    </View>
                </View>

                {showLoader &&
                    <View style={{ height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#c1c7cd" />
                    </View>
                }
            </ScrollView>
        )
}

export default Home;