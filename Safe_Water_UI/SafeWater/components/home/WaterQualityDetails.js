import React, { useState, useEffect } from 'react';
import { View, Image, Text, ImageBackground, ScrollView } from 'react-native';
import globalConstant from '../../constant/globalConstant';
import { Button } from 'react-native-elements';
import { LineChart } from 'react-native-chart-kit'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import styles from '../../styles/globalStyles';

const WaterQualityDetailsComponent = ({ navigation }) => {
    const strings = globalConstant.home_customer_labels;
    const [isGraph, setGraphView] = useState(false);
    const [spots, setSpots] = useState(navigation.getParam('spots'));
    const copySpots = JSON.parse(JSON.stringify(spots)).filter(spot => spot.quality && spot.quality.includes("pH"));
    let qualityArray = [];
    copySpots.map((data) => {
        const parsedData = JSON.parse(data.quality);
        qualityArray.push(parsedData);
    })
    qualityArray = qualityArray.filter(quality => !(quality.pH === '122003'));

    let qualityObject = qualityArray.reduce((reducedObject, currentObject) => {
        reducedObject.pHLevel = reducedObject.pHLevel + parseInt(currentObject.pH ? currentObject.pH : '0');
        reducedObject.tdsLevel = reducedObject.tdsLevel + parseInt(currentObject.tds ? currentObject.tds : '0');
        reducedObject.salinityLevel = reducedObject.salinityLevel + parseInt(currentObject.salinity ? currentObject.salinity : '0');
        return reducedObject;
    }, {
        pHLevel: 0,
        tdsLevel: 0,
        salinityLevel: 0
    });
    const phLevel = parseFloat(qualityObject.pHLevel / qualityArray.length).toFixed(2);
    const tdsLevel = parseFloat(qualityObject.tdsLevel / qualityArray.length).toFixed(2);
    const salinityLevel = parseFloat(qualityObject.salinityLevel / qualityArray.length).toFixed(2);

    const radio_props = [
        { label: 'pH Level', value: 0 },
        { label: 'TDS', value: 1 },
        { label: 'Salinity', value: 2 }
    ];

    const [radioButton, setRadioButton] = useState(0)

    const chartConfig = {
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        color: (opacity = 1) => `rgba(17, 148, 233, ${opacity})`
    }

    const minValue = 5;
    const maxValue = 90;

    const phData = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            data: [6, 13, 18, 9, 11, 12, 19, 6, 13, 18, 9, 11]
        }]
    }

    const tdsData = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            data: [169, 179, 189, 299, 185, 175, 165, 250, 140, 189, 198, 200]
        }]
    }

    const salinityData = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            data: [1200, 900, 1000, 800, 1300, 1600, 1200, 1800, 1500, 1400, 1100, 1100]
        }]
    }

    const showGraph = () => {
        setGraphView(true);
    }

    const hideGraph = () => {
        setGraphView(false);
        setRadioButton(0);
    }

    const onPressRadioButton = (value) => {
        setRadioButton(value);
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {!isGraph && <View style={{ marginTop: 20, marginLeft: 20 }}>
                <Button
                    buttonStyle={styles.graphButton}
                    onPress={() => { showGraph() }}
                    title="View Graph"
                    titleStyle={{ fontSize: 12, color: 'black' }}
                />
            </View>}

            {isGraph && <View style={{ marginTop: 20, marginLeft: 20 }}>
                <Button
                    buttonStyle={styles.graphButton}
                    onPress={() => { hideGraph() }}
                    title="Hide Graph"
                    titleStyle={{ fontSize: 12, color: 'black' }}
                />
            </View>}

            {isGraph && <View style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}>
                <RadioForm style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                    {/* To create radio buttons, loop through your array of options */}
                    {
                        radio_props.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i} style={{ paddingBottom: 15, display: 'flex' }}>
                                <RadioButtonInput
                                    obj={obj}
                                    index={i}
                                    isSelected={radioButton === i}
                                    onPress={(value) => onPressRadioButton(value)}
                                    borderWidth={1}
                                    buttonInnerColor={'#1194E9'}
                                    buttonOuterColor={'grey'}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    buttonStyle={{ marginRight: 5 }}
                                    buttonWrapStyle={{ marginLeft: 10 }}
                                />
                                <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    labelHorizontal={true}
                                    onPress={(value) => onPressRadioButton(value)}
                                    labelStyle={{ fontSize: 14, color: 'black', paddingLeft: 0 }}
                                    labelWrapStyle={{}}
                                />


                            </RadioButton>
                        ))
                    }
                </RadioForm>
            </View>}

            {isGraph && <View style={{marginLeft: 20}}>
                {radioButton === 0 && <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Normal Range is 6.5 to 8.5</Text>}
                {radioButton === 1 && <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Normal Range is 50 to 150</Text>}
                {radioButton === 2 && <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Normal Range is 600 to 900</Text>}
            </View>}

            {!isGraph && <ImageBackground source={require('../../assets/images/water-quality-background.png')} resizeMode="cover" style={{
                width: '100%', height: 400, display: 'flex',
                justifyContent: "center", marginTop: 10
            }}>
                <View style={{ display: 'flex', alignItems: 'center', marginBottom: 50}}>
                    <Image source={require('../../assets/images/water-quality-icon.png')}
                        style={{ width: 100, height: 100, resizeMode: 'contain' }} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 30 }}>
                    <View style={styles.waterQualityBox}>
                        <Text>pH</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{phLevel}</Text>
                        <Text>Range</Text>
                        <Text>6.5 - 8.5</Text>
                    </View>
                    <View style={styles.waterQualityBox}>
                        <Text>TDS</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{tdsLevel}</Text>
                        <Text>Range</Text>
                        <Text>50 - 150</Text>
                    </View>
                    <View style={styles.waterQualityBox}>
                        <Text>Salinity</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{salinityLevel}</Text>
                        <Text>Range</Text>
                        <Text>600 - 900</Text>
                    </View>
                </View>
            </ImageBackground>}


            {isGraph && <ScrollView horizontal={true} vertical={true}>
                <View style={{ marginTop: 30 }}>
                    <LineChart
                        data={radioButton === 0 ? phData : (radioButton === 1 ? tdsData : salinityData)}
                        width={600}
                        height={320}
                        chartConfig={chartConfig}
                        fromZero
                    />
                </View></ScrollView>}

            {(phLevel > 8.5 || tdsLevel > 150 || salinityLevel > 900) && <View style={{ width: '100%', height: 80, backgroundColor: '#ffb3b3', padding: 10, marginTop: 30, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../../assets/images/warning-icon.png')}
                    style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={{ fontSize: 14, fontWeight: '600' }}>Water quality is very poor. Please follow these suggestions to avoid any health issues.</Text>
            </View>}

            {phLevel <= 8.5 && tdsLevel <= 150 && salinityLevel <= 900 && <View style={{ width: '100%', height: 80, backgroundColor: '#b3ffcc', padding: 10, marginTop: 30, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../../assets/images/check.png')}
                    style={{ width: 30, height: 30, marginRight: 10 }} />
                <Text style={{ fontSize: 14, fontWeight: '600' }}>Water quality is good. Please follow these suggestions to avoid any health issues.</Text>
            </View>}

            <View style={{ marginTop: 30, marginBottom: 50, marginLeft: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Suggestions</Text>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 5 }}>- Use boiled water for drinking.</Text>

                </View>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 5 }}>- Use water purifier.</Text>

                </View>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 5 }}>- Raise a complain to near by Water Works Office.</Text>

                </View>
            </View>

            <View style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                    buttonStyle={styles.buttonColor}
                    onPress={() => { navigation.navigate('RaiseComplaint') }}
                    title="Raise a Request"
                    titleStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                />
            </View>

        </ScrollView>

    )
}

export default WaterQualityDetailsComponent;