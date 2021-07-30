import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import useAPI from '../../service/apiService';



const ComplaintComponent = ({ navigation }) => {

    const { postRequest, ENDPOINTS } = useAPI();
    const [complaintData, setComplaintData] = useState([]);

    const getComplaints = async () => {
        postRequest(ENDPOINTS.complaints, {})
            .then(res => {
                res.map(data => {
                    data.isExpanded = false;
                })
                setComplaintData(res);
            })
            .catch(() => console.log('error'))
    }

    useEffect(() => {
        getComplaints();
    }, [])

    const expandRequest = (index, value) => {
        let newState = [...complaintData];
        newState[index].isExpanded = value;
        setComplaintData(newState);
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', padding: 20 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {complaintData && complaintData.map((data, index) => (
                <View>
                    <View style={styles.requestBox}>
                        <View style={{ fontSize: 12 }}>
                            <View>
                                <Text style={{ marginRight: 5, color: '#525252' }}>Request Id</Text>
                            </View>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>{data._id.substring(data._id.length - 8)}</Text>
                            </View>

                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems:'center',  fontSize: 12 }}>
                            <View>
                                <Text style={{ marginRight: 5, color: '#525252' }}>Status</Text>
                            </View>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>{data.status ? data.status : 'Completed'}</Text>
                            </View>
                        </View>

                        <View>
                            {!complaintData[index].isExpanded && <TouchableOpacity onPress={() => expandRequest(index, true)} >
                                <Image source={require('../../assets/images/expand-arrow.png')}
                                    style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>}
                            {complaintData[index].isExpanded && <TouchableOpacity onPress={() => expandRequest(index, false)} >
                                <Image source={require('../../assets/images/collapse-arrow.png')}
                                    style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>}
                        </View>

                    </View>

                    {complaintData[index].isExpanded && <View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ color: '#525252', fontSize: 14 }}>Reasons:</Text>
                            <Text style={{ fontSize: 14, marginLeft: 10, fontWeight: 'bold' }}> - pH level is very high.</Text>
                            <Text style={{ fontSize: 14, marginLeft: 10, fontWeight: 'bold' }}> - TDS level is very high.</Text>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ color: '#525252', fontSize: 14 }}>Comments:</Text>
                            <Text style={{ fontSize: 14, marginLeft: 10, fontWeight: 'bold' }}> Water quality in my area is very bad.</Text>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ color: '#525252', fontSize: 14 }}>Contact for more details:</Text>
                            <Text style={{ fontSize: 14, marginLeft: 10, fontWeight: 'bold' }}> 022 38338383</Text>
                        </View>

                    </View>}
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    requestBox: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#E2F0F7',
        height: 90,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center', justifyContent: 'space-between'
    }
})

export default ComplaintComponent;