import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { AuthContext } from "../../App";
import globalConstant from '../../constant/globalConstant';
const Category = ({ navigation }) => {
    const { state: authState } = React.useContext(AuthContext);
    const { dispatch } = React.useContext(AuthContext);
    const mobileNumber = navigation.getParam('mobileNumber');
    const isRegister = navigation.getParam('isRegister') ? navigation.getParam('isRegister') : false;
    const radio_props = [
        { label: 'Safe Drinking Water', value: 0 },
        { label: 'Water Quality', value: 1 },
        { label: 'Add Site', value: 2 },
        { label: 'Approve Site', value: 3 }
    ];
    const token = navigation.getParam('token');
    const [radioButton, setRadioButton] = useState(0)

    const onPressRadioButton = (value) => {
        setRadioButton(value);
    }

    const goNext = () => {
        dispatch({
            type: "LOGIN",
            token,
            category: radio_props[radio_props.findIndex(item => item.value === radioButton)].label,
            userRole: globalConstant.user_role.CUSTOMER,
            mobileNumber: authState.mobileNumber ? authState.mobileNumber : mobileNumber,
            isRegistered: isRegister
        })
        navigation.navigate('Home');
    }
    
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={styles.loginBox}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, marginTop: 5, color: '#737373' }}>Please select your preferred Category.</Text>
                </View>
                <View style={{ marginTop: 30, width: 325 }}>
                    <RadioForm
                    >
                        {/* To create radio buttons, loop through your array of options */}
                        {
                            radio_props.map((obj, i) => (
                                <RadioButton labelHorizontal={true} key={i} style={{paddingBottom: 15, display: 'flex', justifyContent: 'space-between', marginBottom: 20, borderBottomColor: 'grey',
                                borderBottomWidth: 1}}>
                                    <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        labelHorizontal={true}
                                        onPress={ (value) => onPressRadioButton(value)}
                                        labelStyle={{ fontSize: 18, color: 'black', fontWeight: '600', paddingLeft: 0 }}
                                        labelWrapStyle={{}}
                                    />
                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={radioButton === i}
                                        onPress={ (value) => onPressRadioButton(value)}
                                        borderWidth={1}
                                        buttonInnerColor={'#1194E9'}
                                        buttonOuterColor={'grey'}
                                        buttonSize={12}
                                        buttonOuterSize={22}
                                        buttonStyle={{}}
                                        buttonWrapStyle={{ marginLeft: 10 }}
                                    />
                                    
                                </RadioButton>
                            ))
                        }
                    </RadioForm>
                </View>
                <View style={styles.buttonCustom} >
                    <Button
                        buttonStyle={styles.buttonColor}
                        onPress={goNext}
                        title="Next"
                        titleStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    buttonCustom: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 50
    },
    buttonColor: {
        backgroundColor: '#1194E9',
        height: 50,
        width: 325
    },

    loginBox: {
        alignItems: 'center',
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 50,
        paddingLeft: 20,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'white'
    }
})

export default Category;