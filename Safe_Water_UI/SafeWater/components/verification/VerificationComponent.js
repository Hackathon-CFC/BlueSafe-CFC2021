import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import { Button } from 'react-native-elements';
import useAPI from '../../service/apiService';

const Verification = ({ navigation }) => {
    const isRegister = navigation.getParam('isRegister') ? navigation.getParam('isRegister') : false;
    const [inputMobile, setInputMobile] = useState('');
    const [countryCode, setCountryCode] = useState("91");
    const { postRequest, ENDPOINTS } = useAPI();

    const handleMobileInput = (mobile) => {
        setInputMobile(mobile);
    }

    const handleCountryCode = (code) => {
        setCountryCode(code.callingCode[0]);
        console.log(countryCode);
    }

    const sendOtp = () => {
        postRequest(ENDPOINTS.sendOtp, {
            mobile: countryCode + inputMobile
        })
            .then(res => {
                console.log(res);
                navigation.navigate('OTP', { mobileNumber: inputMobile, id: res.id, isRegister: isRegister });
            })
            .catch(() => console.log('error'))
    }


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={styles.loginBox}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 5, color: '#737373' }}>Verification</Text>
                    <Text style={{ fontSize: 16, marginTop: 5, color: '#737373' }}>Enter your Mobile number to receive OTP</Text>
                </View>

                <View style={{ marginTop: 50 }}>
                    <PhoneInput
                        defaultValue={inputMobile}
                        defaultCode="IN"
                        layout="second"
                        onChangeText={(text) => {
                            if(text.length<=10) {
                                handleMobileInput(text);
                            }
                        }}
                        onChangeCountry={(text) => {
                            handleCountryCode(text);
                        }}
                        textInputProps={{ value: inputMobile}}
                        withDarkTheme
                        placeholder="Mobile Number"
                        containerStyle={styles.inputContainer}
                        textInputStyle={styles.inputText}
                    />
                </View>

                <View style={styles.buttonCustom} >
                    <Button
                        buttonStyle={styles.buttonColor}
                        onPress={() => { sendOtp() }}
                        title="Continue"
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
    },

    inputContainer: {
        borderColor: '#a6a6a6',
        borderWidth: 2,
        borderRadius: 2,
        width: 325
    },

    inputText: {
        color: '#737373'
    }

})


export default Verification;