import styles from '../../styles/globalStyles';
import React , { useEffect, useState } from 'react';
import { View, Text, Image} from 'react-native';
import useAPI from '../../service/apiService';

const ImageTile = ({spots}) => {
    const {BASE_URL} = useAPI();
    const [spotData, setSpotData] = useState(spots);

    useEffect(() => {
        setSpotData(spots);
    }, [spots]);
    
    const onError = (spotID) => {
        const data  = [...spotData.map(spot => ({...spot}))]
        data[spotData.findIndex(spot => spot._id === spotID)].error = true;
        setSpotData(data);
    }
    return (
        <View>
            {
                spotData.map((spot, index) => {return (
                    <View key={index} style={styles.imageTile}>
                        <View>
                            <View style={styles.image} >
                                <Image 
                                    defaultSource={ require('../../assets/images/water-drops-icon.jpg')}
                                    onError={() => onError(spot._id)}
                                    source={!spot.error && spot.images && spot.images[0]  ? { uri: `${BASE_URL}${spot.images[0]}`} :  require('../../assets/images/water-drops-icon.jpg')} 
                                    style={{ width: 80, height: 100}} />
                            </View>
                            <Text style={styles.approvedText}>Approved</Text>
                        </View>
                      
                        <View style={{...styles.normalText, flexBasis: '75%', paddingRight: 13}}>
                            <Text style={{...styles.normalText, color: '#878d96', fontWeight: 'bold'}}>Name: {spot.name ? spot.name  : "None"}</Text>
                            <Text style={{...styles.normalText, color: '#878d96'}} >Address: {spot.address ? spot.address  : "None"}</Text>  
                            <Text style={{...styles.normalText, color: '#878d96'}} >Capacity: {spot.capacity ? spot.capacity  : "None"}</Text>  
                        </View>
                    </View>
                )})  
            }
        </View> 
    )
}

export default ImageTile;