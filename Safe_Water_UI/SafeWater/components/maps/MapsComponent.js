import React, { useState, useEffect, useRef } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

const Map = ({ navigation }) => {
  const mapRef = useRef();
  const spots = navigation.getParam('spots');
  let markers = [];
  let carousel;
  // markers = navigation.getParam('markers');
  markers = [
    {
      "coordinates": {
        "latitude": 28.466616,
        "longitude": 76.990309
      },
      "description": "Sector 104, Gurugram, Haryana 122006",
      "id": "679582aee3dee5c99b1115d98b251689",
      "title": "HUDA Sewage Treatment Plant"
    },
    {
      "coordinates": {
        "latitude": 28.464897,
        "longitude": 76.994745
      },
      "description": "Daulatabad, Gurugram, Haryana 122006",
      "id": "949d67e014393ef05a0f471128f31410",
      "title": "Jain Water Supply "
    },
    {
      "coordinates": {
        "latitude": 28.458957,
        "longitude": 76.976619
      },
      "description": "Sector 9B, Gurugram, Haryana 122006",
      "id": "949d67e014393ef05a0f471128f3b28d",
      "title": "Atom Supply"
    },
    {
      "coordinates": {
        "latitude": 28.464897,
        "longitude": 76.982745
      },
      "description": "Daulatabad, Gurugram, Haryana 122006",
      "id": "e6834512f938c0ececd44bac2b3a2c78",
      "title": "Shree Water Supply"
    },
    {
      "coordinates": {
        "latitude": 28.458957,
        "longitude": 76.986619
      },
      "description": "Basai Village, Sector 9B, Gurugram, Haryana 122006",
      "id": "e6834512f938c0ececd44bac2b3afe57",
      "title": "Blue star supply"
    }
  ]
  console.log('markers', markers);
  // markers = markers.filter(marker => !(marker.title.trim() === 'Agrawal Water Supply' || marker.title.trim() === 'Abhishek Water Supply' ||  marker.title.trim() === 'Jayant Water Supply'));

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.card}>
        <Image source={require('../../assets/images/vendor-image-3.jpg')} style={{ width: 200, height: 120, marginBottom: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
        <View style={{ padding: 10, display: 'flex', flexDirection: 'column' }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>{item.title}</Text>
          <Text style={{ fontSize: 12, marginBottom: 5 }}>{item.description}</Text>
          <Text style={{ fontSize: 12, marginBottom: 5 }}>Distance: 0.5-1 Km</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} showsUserLocation={true}
        followUserLocation={true}
        showsCompass={true}
        mapType="standard"
        provider="google"
        onMapReady={() => { mapRef.current.fitToSuppliedMarkers(markers.map(({ _id }) => _id), { edgePadding: { top: 500, right: 100, bottom: 800, left: 200 }, animated: true }) }}
      >
        {markers && markers.map((marker, index) => (
          <MapView.Marker
            key={marker._id}
            identifier={marker._id}
            coordinate={marker.coordinates}
            title={marker.title}
            showCallout
          >
            <Image source={require('../../assets/images/map-icon-1.png')} style={{ height: 50, width: 50, resizeMode: "contain" }} />
          </MapView.Marker>
        ))}
      </MapView>

      <View style={{ position: 'absolute', bottom: 270, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>

        <TouchableOpacity style={{
          width: '80%', height: 40, display: 'flex', alignItems: 'center', flexDirection: 'row', backgroundColor: '#ffff',
          borderColor: '#E6E6E6', borderWidth: 1, borderRadius: 2, padding: 5
        }} onPress={() => { navigation.navigate('Spots', { spots: spots }) }}>
          <Image source={require('../../assets/images/list-icon.png')} style={{ marginRight: 5, height: 16, width: 16, resizeMode: "contain" }} />
          <View>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{markers.length} water sites are available in your area</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate('HomeVendor') }} style={{ width: '20%', height: 40, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Image source={require('../../assets/images/add-spots.png')} style={{ marginRight: 5, height: 50, width: 50, resizeMode: "contain" }} />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 10 }}>
        <Carousel
          ref={(c) => { carousel = c; }}
          data={markers}
          renderItem={renderItem}
          sliderWidth={120}
          itemWidth={120}
          itemHeight={152}
          sliderHeight={152}
          layout={"default"}
          slideStyle={{ marginRight: 100 }}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          loop={false}
        ></Carousel>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  card: {
    width: 200,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6
  },

  locateButtom: {
    width: 100,
    height: 40
  }
});

export default Map;