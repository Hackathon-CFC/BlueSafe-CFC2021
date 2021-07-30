import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

const Login = ({navigation}) => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={styles.loginBox}>
                <View style={{ alignItems: 'center'}}>
                    <Image source={require('../../assets/images/water-icon.png')}
                        style={{ width: 60, height: 60 }} />
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 5, color: '#737373' }}>Clean & Safe Water</Text>
                </View>

                <View style={styles.buttonCustom} >
                    <Button
                        buttonStyle={styles.buttonColor}
                        onPress={()=>{navigation.navigate('Verification')}}
                        title="Login with Mobile"
                        titleStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                    />

                    <Button
                        buttonStyle={styles.buttonColor}
                        onPress={()=>{navigation.navigate('Register')}}
                        title="Register"
                        titleStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                    <Text style={{fontSize: 16, marginTop: 10, color: '#737373', fontWeight: '600'}}>Skip</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    buttonCustom: {
        marginTop: 150,
        marginBottom: 20,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    buttonColor: {
        backgroundColor: '#737373',
        height: 50, 
        width: 325,
        marginBottom:20,
    },

    loginBox: {
        alignItems: 'center', 
        paddingTop: 80,
        paddingRight: 20,
        paddingBottom: 50,
        paddingLeft: 20,
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        height: '100%'
    }
})

export default Login;