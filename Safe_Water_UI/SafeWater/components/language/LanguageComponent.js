import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { AuthContext } from "../../App";
import globalConstant from '../../constant/globalConstant';
const Language = ({ navigation }) => {
    const { dispatch } = React.useContext(AuthContext);
    const radio_props = [
        { label: 'English', value: 0 },
        { label: 'हिंदी', value: 1 }
    ];
    const token = navigation.getParam('token');
    const [radioButton, setRadioButton] = useState(0)

    const onPressRadioButton = (value) => {
        setRadioButton(value);
    }

    const setLanguage = () => {
        navigation.navigate('CurrentLocation', { language: radioButton === 0 ? 'English' : 'Hindi'});
    }
    
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={styles.loginBox}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, marginTop: 5, color: '#737373' }}>Please select the app language you want.</Text>
                </View>
                <View style={{ marginTop: 30, width: '100%' }}>
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
                                        labelStyle={{ fontSize: 14, color: 'black', fontWeight: 'bold', paddingLeft: 0 }}
                                        labelWrapStyle={{}}
                                    />
                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={radioButton === i}
                                        onPress={ (value) => onPressRadioButton(value)}
                                        borderWidth={1}
                                        buttonInnerColor={'#3399ff'}
                                        buttonOuterColor={'grey'}
                                        buttonSize={12}
                                        buttonOuterSize={18}
                                        buttonStyle={{}}
                                        buttonWrapStyle={{ marginLeft: 10 }}
                                    />
                                    
                                </RadioButton>
                            ))
                        }
                    </RadioForm>

                    <View style={styles.buttonCustom} >
                    <Button
                        buttonStyle={styles.buttonColor}
                        onPress={() => { setLanguage() }}
                        title="Next"
                        titleStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                    />
                </View>
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
        width: 335
    },

    loginBox: {
        alignItems: 'center',
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 50,
        paddingLeft: 20,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    }
})

export default Language;