import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { AuthContext } from "../../App";

const Profile = ({ navigation }) => {
    const { state: authState } = React.useContext(AuthContext);
    const { dispatch } = React.useContext(AuthContext);
    const mobileNumber = authState.mobileNumber ? authState.mobileNumber : null;
    const handleLogin = () => {
        navigation.navigate('Verification');
    }

    const handleRegister = () => {
        navigation.navigate('Register');
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={styles.topHead}>
                <Image source={require('../../assets/images/water-icon-white.png')} style={{ width: 60, height: 60 }} />
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 }}>BLUE SAFE</Text>
                { mobileNumber && <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>{mobileNumber}</Text> }
                <View style={{ diplay: 'flex', flexDirection: 'row', marginTop: 20 }}>
                    {!authState.isAuthenticated && <View style={styles.buttonCustom} >
                        <TouchableOpacity onPress={() => handleLogin()}>
                            <Text style={{ fontSize: 18, color: 'white' }}>LOGIN / </Text>
                        </TouchableOpacity>
                    </View>}
                    {!authState.isRegistered && <View style={styles.buttonCustom} >
                        <TouchableOpacity onPress={() => handleRegister()}>
                            <Text style={{ fontSize: 18, color: 'white' }}>REGISTER</Text>
                        </TouchableOpacity>

                    </View>}

                </View>
            </View>

            <View style={{ backgroundColor: '#E4F7FF', height: 48, marginTop: 30, paddingLeft: 30, paddingTop: 10 }} >
                <TouchableOpacity onPress={() => navigation.navigate('Category')}>
                    <Text style={{ fontSize: 18, color: '#4285F4' }}>Select Category</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    buttonCustom: {
        marginTop: 10
    },
    buttonColor: {
        backgroundColor: 'white',
        height: 50,
        width: 325
    },

    loginBox: {
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
        height: '100%'
    },
    topHead: {
        backgroundColor: '#1194E9',
        height: 350,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Profile;