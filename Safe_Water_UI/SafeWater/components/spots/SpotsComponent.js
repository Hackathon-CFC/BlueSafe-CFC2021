import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import { _retrieveData, _storeData } from '../../service/storageService'



const Spots = ({ navigation }) => {

    const [spots, setSpots] = useState(navigation.getParam('spots'));

    useEffect(() => {
        _retrieveData('favouriteSpots').then(data => {
            if (data && data !== '') {
                const favouriteSpots = JSON.parse(data);
                const initialSpots = [...spots.map(spot => ({ ...spot }))];
                favouriteSpots.map(spot => {
                    const index = spots.findIndex(item => item._id === spot._id);
                    if (index >= 0) {
                        initialSpots[index]['isFavourite'] = true;
                    }
                });
                setSpots(initialSpots);
            }
        });
    }, []);

    const updateFavourite = (spot, type) => {

        _retrieveData('favouriteSpots').then(data => {
            if (data && data !== '') {
                const favouriteSpots = JSON.parse(data);
                if (favouriteSpots && favouriteSpots.length >= 3 && type === 'add') {
                    // alert("Max three favourites are allowed");
                    // ToastAndroid.show("Max three favourites are allowed" , ToastAndroid.SHORT)
                }
                else {
                    if (type === 'add') {
                        favouriteSpots.push(spot);
                    } else {
                        const index = favouriteSpots.findIndex(item => item._id === spot._id);
                        favouriteSpots.splice(index, 1);
                    }
                    _storeData('favouriteSpots', JSON.stringify(favouriteSpots))
                    const index = spots.findIndex(item => item._id === spot._id);
                    const data = [...spots.map(spot => ({ ...spot }))];
                    data[index]['isFavourite'] = type === 'add' ? true : false;
                    setSpots(data);
                }
            } else {
                const favouriteSpots = [];
                favouriteSpots.push(spot);
                _storeData('favouriteSpots', JSON.stringify(favouriteSpots))
                const index = spots.findIndex(item => item._id === spot._id);
                const data = [...spots.map(spot => ({ ...spot }))];
                data[index]['isFavourite'] = type === 'add' ? true : false;
                setSpots(data);
            }
        })

    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: 'white' }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {spots.map((data, key) => (
                <View>
                    {data && data.name && data.address && data.approval_stat && <View key={key} style={styles.pageView}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{data.name}</Text>
                        <Text style={{ fontSize: 14 }}>{data.address}</Text>
                        <Text style={{ fontSize: 14 }}>Pin: {data.pin}</Text>
                        <Text style={{ fontSize: 14 }}>Approval Status: {data.approval_stat.status}</Text>
                        {data.distance && <Text style={{ fontSize: 14 }}>Type: {data.distance}</Text>}

                        {data.feedback && data.feedback.actual &&
                            <View style={{ borderBottomWidth: 1, marginTop: 20, paddingBottom: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ flexBasis: '50%', fontSize: 14 }}>Water Availability:</Text>
                                <View style={{ flexBasis: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                                    <Image source={data.feedback.actual == 'Yes' ? require('../../assets/images/app-icon.png') : require('../../assets/images/black-drop.png')} style={{ width: 15, height: 15, alignSelf: 'center', marginRight: 15 }} />
                                    <Text style={{ margingLeft: 20, fontSize: 14, alignSelf: 'center' }}>{data.feedback.actual}</Text>
                                </View>

                            </View>
                        }
                        {data.feedback && data.feedback.quality &&
                            <View style={{ borderBottomWidth: 1, marginTop: 20, marginBottom: 20, paddingBottom: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ flexBasis: '50%', fontSize: 14 }}>Water Quality:</Text>
                                <View style={{ flexBasis: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                                    <Image source={data.feedback.quality == 'Good' ? require('../../assets/images/hand-icon.jpg') : require('../../assets/images/thumb_down.png')} style={{ width: 30, height: 30, alignSelf: 'center', margingRight: 25 }} />
                                    <Text style={{ marginLeft: 10, fontSize: 14, alignSelf: 'center' }}>{data.feedback.quality}</Text>
                                </View>

                            </View>
                        }
                        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                navigation.navigate('Home', {
                                    locateMarkers: [{
                                        coordinates: {
                                            title: data.name,
                                            description: data.address,
                                            coordinates: {
                                                latitude: parseFloat(data.lat),
                                                longitude: parseFloat(data.long)
                                            }
                                        }
                                    }]
                                })
                            }}>
                                <Image source={require("../../assets/images/direction-icon.png")} style={{ width: 20, height: 20, marginRight: 5 }} />
                                <Text style={{ fontSize: 14, color: '#ffffff', fontWeight: 'bold' }}>Directions</Text>
                            </TouchableOpacity>
                            {
                                !data.isFavourite &&
                                <TouchableOpacity style={{ flexBasis: '50%' }} onPress={() => updateFavourite(data, 'add')} >
                                    <View style={{ height: 40, borderWidth: 1, borderColor: 'rgb(51, 153, 255)', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Image source={require('../../assets/images/unlike.png')} style={{ width: 50, height: 34, marginBottom: 5 }} />
                                        <Text style={{ color: 'rgb(51, 153, 255)', alignSelf: 'center' }}>Favourite</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            {
                                data.isFavourite &&
                                <TouchableOpacity style={{ flexBasis: '50%' }} onPress={() => updateFavourite(data, 'remove')} >
                                    <View style={{ height: 40, borderWidth: 1, borderColor: 'rgb(51, 153, 255)', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Image source={require('../../assets/images/like.png')} style={{ width: 50, height: 34 }} />
                                        <Text style={{ color: 'rgb(51, 153, 255)', alignSelf: 'center', fontSize: 10 }}>Remove Favourite</Text>
                                    </View>
                                </TouchableOpacity>

                            }
                        </View>

                    </View>}
                </View>

            ))}
        </ScrollView>
    )

}

const styles = StyleSheet.create({

    pageView: {
        padding: 10,
        backgroundColor: 'white',
        borderColor: '#E6E6E6',
        borderBottomWidth: 1,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },

    button: {
        backgroundColor: '#3399ff',
        height: 40,
        width: 130,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    }

})

export default Spots;