import React, {useState} from 'react';
import { View, TextInput, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import globalConstant from '../../constant/globalConstant';
import {Picker} from "@react-native-picker/picker";
import useAPI from '../../service/apiService';
import styles  from '../../styles/globalStyles';
import { _storeData } from '../../service/storageService';
import { AuthContext } from "../../App";

const Register = ({navigation}) => {

    const { postRequest, ENDPOINTS} = useAPI();
    const { dispatch } = React.useContext(AuthContext);
    const fields = globalConstant.registerationFormFields;
    const [registerData, setRegisterData] = useState(fields.reduce((initialData, field) => ({...initialData, [field.name]: ''}), {}));
    
    const onSubmit = async () => {
        postRequest(ENDPOINTS.register, registerData).then(() => {
            dispatch({type: "REGISTER"});
            _storeData('vendorDetails', JSON.stringify(registerData))
            .then(() =>  navigation.navigate('Verification', { isRegister: true }));
        })
        .catch(error => {
            console.log(error.message);
        });
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {
                fields.map (field => (
                    <View key={field.name} style={styles.field}>
                        <Text style={styles.label} >{field.label}</Text>
                        {
                            field.type === 'text' ? (
                                <TextInput
                                    style={styles.input}
                                    value={registerData[field.name]}
                                    onChangeText={text => {
                                        if(field.maxValue){
                                            if(text<=field.maxValue) {
                                                setRegisterData({...registerData, [field.name]: text})
                                            }
            
                                        }  else if (field.minValue){
                                            if(text>=field.maxValue) {
                                                setRegisterData({...registerData, [field.name]: text})
                                            }
                                        } else {
                                            setRegisterData({...registerData, [field.name]: text})
                                        }
                                    
                                    }}
                                    placeholder={field.placeholder}
                            />
                            ): (
                                <Picker
                                    selectedValue={registerData[field.name]}
                                    style={styles.input}
                                    onValueChange={(itemValue) => setRegisterData({...registerData, [field.name]: itemValue})}
                                >
                                    {
                                        field.options.map(option => (
                                            <Picker.Item label={option.label} value={option.value} />
                                        ))  
                                    }
                              </Picker>
                            )
                        }
                      
                 </View>
                ))  
             
            }
            <Button
                buttonStyle={styles.submitBtn}
                onPress={onSubmit}
                title="Register"
                titleStyle={{fontWeight: 'bold' }}
            />
           
        </ScrollView>
    )
}

export default Register;