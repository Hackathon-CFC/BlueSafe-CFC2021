import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { WebView } from 'react-native-webview';

const Watson = ({ navigation }) => {
    let webViewRef;
    useEffect(() => {
        const focusListener = navigation.addListener('didFocus', () => {
            if (webViewRef) {
                webViewRef.reload();
            }
        });
        return () => {
            focusListener.remove();
        };
    },[])
    if (Platform.OS === 'ios') {
        return (
            <View style={{ flex: 1, paddingTop: 30 }}>
                <WebView
                    ref={WEBVIEW_REF => (webViewRef = WEBVIEW_REF)}
                    source={{ uri: 'https://web-chat.global.assistant.watson.cloud.ibm.com/preview.html?region=kr-seo&integrationID=97a04f64-47d4-4ea3-b8f4-ba917961c3ad&serviceInstanceID=3d26b7e9-dfe0-43fb-8915-d4ca23a95554' }}
                />
            </View>
        )
    } else {
        return (
            <View style={{ flex: 1, paddingTop: 30 }}>
                <WebView
                    ref={WEBVIEW_REF => (webViewRef = WEBVIEW_REF)}
                    source={{ uri: 'https://web-chat.global.assistant.watson.cloud.ibm.com/preview.html?region=kr-seo&integrationID=97a04f64-47d4-4ea3-b8f4-ba917961c3ad&serviceInstanceID=3d26b7e9-dfe0-43fb-8915-d4ca23a95554' }}
                />
            </View>
        )
    }
}

export default Watson;