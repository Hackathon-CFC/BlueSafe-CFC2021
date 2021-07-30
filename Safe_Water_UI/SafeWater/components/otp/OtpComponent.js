import React, {useState, useEffect} from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { AuthContext } from "../../App";
import useAPI from '../../service/apiService'

const OTP = ({navigation}) => {
    const isRegister = navigation.getParam('isRegister') ? navigation.getParam('isRegister') : false;
    const { dispatch } = React.useContext(AuthContext);
    const [inputOTP1, setInputOTP1] = useState('');
    const [inputOTP2, setInputOTP2] = useState('');
    const { postRequest, ENDPOINTS } = useAPI();
    const id = navigation.getParam('id');
    const mobileNumber = navigation.getParam('mobileNumber');

    const handleOtp = (id, otpType) => {
        if (otpType === 'otp1') {
            setInputOTP1(id);
        } else {
            setInputOTP2(id);
        }
    }

    const validateOtp = () => {
        postRequest(ENDPOINTS.sendOtp, {
            otp: inputOTP2,
            id: id
        })
            .then(res => {
                navigation.navigate('Category', { mobileNumber, isRegister });
            })
            .catch(() => console.log('error'))
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.loginBox}>
            <View style={{ alignItems: 'center'}}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 5, color: '#737373' }}>Verify OTP</Text>
                <Text style={{ fontSize: 16, marginTop: 5, color: '#737373' }}>Enter 10 digit OTP received on your mobile</Text>
            </View>

                <View style={{marginTop: 50, display: 'flex', width: 325, flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                        keyboardType={'number-pad'}
                        style={{ backgroundColor: 'white', height: 50, width: 100, borderColor: '#e2e1e1', borderWidth: 1, paddingLeft: 10 }}
                        onChangeText={(id) => { handleOtp(id, 'otp1') }}
                        value={inputOTP1}
                        placeholderTextColor="#a8a8a8"
                        maxLength={4}
                    />
                    <Text>-</Text>
                    <TextInput
                        keyboardType={'number-pad'}
                        style={{ backgroundColor: 'white', height: 50, width: 220, borderColor: '#e2e1e1', borderWidth: 1, paddingLeft: 10 }}
                        onChangeText={(id) => { handleOtp(id, 'otp2') }}
                        value={inputOTP2}
                        placeholderTextColor="#a8a8a8"
                        maxLength={6}
                    />
                </View>

            <View style={styles.buttonCustom} >
                <Button
                    buttonStyle={styles.buttonColor}
                    onPress={()=>{ validateOtp()}}
                    title="Verify OTP"
                    titleStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                />
            </View>
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    buttonCustom: {
        marginTop: 20,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    buttonColor: {
        backgroundColor: '#1194E9',
        height: 50, 
        width: 325
    },

    loginBox: {
        alignItems: 'center', 
        paddingTop: 100,
        paddingRight: 20,
        paddingBottom: 50,
        paddingLeft: 20,
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        backgroundColor: 'white'
    }
})


export default OTP;