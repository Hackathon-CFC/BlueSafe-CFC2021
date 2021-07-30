import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import globalConstant from '../../constant/globalConstant';
import useAPI from '../../service/apiService';
import styles from '../../styles/globalStyles';


const RaiseComplaintComponent = ({ navigation }) => {

    const { postRequest, ENDPOINTS } = useAPI();
    const fields = globalConstant.complaintFormFields;
    const [complaintData, setComplaintData] = useState(fields.reduce((initialData, field) => ({ ...initialData, [field.name]: '' }), {}));

    const onSubmit = async () => {
        postRequest(ENDPOINTS.addComplaint, complaintData)
        .then(res => {
            navigation.navigate('Complaint');
        })
        .catch(() => console.log('error'))
    }
    
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', padding:20 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {
                fields.map(field => (
                    <View key={field.name} style={styles.field}>
                        <Text style={styles.label} >{field.label}</Text>
                        <TextInput
                            style={styles.input}
                            value={complaintData[field.name]}
                            onChangeText={text => {
                                if(field.maxValue){
                                    if(text<=field.maxValue) {
                                        setComplaintData({ ...complaintData, [field.name]: text })
                                    }
    
                                }  else if (field.minValue){
                                    if(text>=field.maxValue) {
                                        setComplaintData({ ...complaintData, [field.name]: text })
                                    }
                                } else {
                                    setComplaintData({ ...complaintData, [field.name]: text })
                                }
                            }}     
                            placeholder={field.placeholder}
                        />
                    </View>
                ))
            }
            <Button
                buttonStyle={styles.submitBtn}
                onPress={onSubmit}
                title="Submit"
                titleStyle={{ fontWeight: 'bold' }}
            />

        </ScrollView>
    )
}

export default RaiseComplaintComponent;