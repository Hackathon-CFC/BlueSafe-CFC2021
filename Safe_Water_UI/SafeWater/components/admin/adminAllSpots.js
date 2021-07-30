import styles from '../../styles/globalStyles';
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import useAPI from '../../service/apiService';

const AdminAllSpots = ({spots, onUpdate}) => {
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
                spotData.map(spot => (
                    <View style={{borderBottomColor: '#a6a6a6', borderBottomWidth: 1, marginBottom: 20}}>
                         <View style={{...styles.imageTile,  borderBottomWidth: 0, paddingBottom: 2, flexDirection: 'row', marginVertical: 20}} >
                            <View style={styles.image}>
                                <Image  
                                    defaultSource={ require('../../assets/images/water-drops-icon.jpg')}
                                    onError={() => onError(spot._id)}
                                    source={!spot.error && spot.images && spot.images[0] ? { uri: `${BASE_URL}${spot.images[0]}`} :  require('../../assets/images/water-drops-icon.jpg')} style={{ width: 80, height: 100}} 
                                    style={{ width: 80, height: 100}} 
                                />
                                { spot.approval_stat && spot.approval_stat.status && spot.approval_stat.status === "Approved" && <Text style={styles.approvedText}>Approved</Text>}
                                { spot.approval_stat && spot.approval_stat.status && spot.approval_stat.status === "Rejected" && <Text style={styles.approvedText}>Rejected</Text>}
                            </View>
                            <View style={{...styles.normalText, flexBasis: '75%', paddingRight: 13}}>
                                <Text style={{...styles.normalText, color: '#878d96', fontWeight: 'bold'}}>Name: {spot.name ? spot.name : 'None'}</Text>
                                <Text style={{...styles.normalText, color: '#878d96'}} >Address: {spot.address ? spot.address: 'None'}</Text> 
                                <Text style={{...styles.normalText, color: '#878d96'}} >Capacity: {spot.capacity ? spot.capacity: 'None'}</Text>
                            </View>
                        </View>
                        {
                            (!spot.approval_stat || !spot.approval_stat.status || spot.approval_stat.status == 'Submitted') && 
                            <View style={{...styles.buttonCustom, marginTop: '2%', display: 'flex', flexDirection: 'row'}} >
                                <Button
                                    onPress={() => onUpdate(spot, 'Approved')}
                                    buttonStyle={styles.adminbuttonApprove}
                                    title="Approve"
                                    titleStyle={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold' }}
                                />
                                <Button
                                    onPress={() => onUpdate(spot, 'Rejected')}
                                    buttonStyle={styles.adminbuttonDissaprove}
                                    title="Disapprove"
                                    titleStyle={{ color: '#a6a6a6', fontSize: 14, fontWeight: 'bold' }}
                                />
                            </View>
                        }
                       
                    </View>
                   
                ))  
            }
        </View> 
    )
}

export default AdminAllSpots;