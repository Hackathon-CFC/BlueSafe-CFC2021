import React, {useState, useEffect} from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView , Platform, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import globalConstant from '../../constant/globalConstant';
import * as ImagePicker from 'expo-image-picker';
import useAPI from '../../service/apiService';
import { AuthContext } from "../../App";

const AddSafeDrinkingSpotComponent = ({navigation}) => {
    const { state: authState } = React.useContext(AuthContext);
    const fields = globalConstant.addSafeWaterSpotFields;
    const [addSafeSpotFormData, setaddSafeSpotFormData] = useState(fields.reduce((initialData, field) => ({...initialData, [field.name]: ''}), {}));
    const { postRequest, ENDPOINTS} = useAPI();
    const [images, setImages] = useState([]);
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
            setImages([...images, result.uri]);
        }
    };

    const removeImage = (selectedImage) => {
        images.splice(images.findIndex(image => image === selectedImage), 1);
        setImages([...images]);
    };
  
    const onSubmit = () => {
        const data = {...addSafeSpotFormData};
        data.mobile = authState.mobileNumber;
        let formData = new FormData();
        if(images.length > 0) {
            formData.append('images', images);
        }
        formData.append('name', addSafeSpotFormData.name);
        formData.append('address', addSafeSpotFormData.address);
        formData.append('capacity', addSafeSpotFormData.capacity);
        formData.append('pin', addSafeSpotFormData.pin);
        formData.append('quality_params', JSON.stringify({
            pH: addSafeSpotFormData.pH,
            tds: addSafeSpotFormData.tds,
            salinity: addSafeSpotFormData.salinity
        }));
        postRequest(ENDPOINTS.addSpot, formData, true).then(res => {
            navigation.navigate('addSafeDrinkingSpotSuccess');
        })
        .catch(error => {
            console.log(error.message);
        });  
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, backgroundColor: 'white' }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={true}>
            {
                fields.map (field => (
                    <View key={field.name} style={styles.field}>
                        <Text style={styles.label} >{field.label}</Text>
                        {
                            field.type === 'text' ? (
                                <TextInput
                                    style={styles.input}
                                    value={addSafeSpotFormData[field.name]}
                                    onChangeText={text =>{
                                        if(field.maxValue){
                                            if(text<=field.maxValue) {
                                                setaddSafeSpotFormData({...addSafeSpotFormData, [field.name]: text})
                                            }

                                        }  else if (field.minValue){
                                            if(text>=field.maxValue) {
                                                setaddSafeSpotFormData({...addSafeSpotFormData, [field.name]: text})
                                            }
                                        } else {
                                            setaddSafeSpotFormData({...addSafeSpotFormData, [field.name]: text})
                                        }
                                    }}
                                    placeholder={field.placeholder}
                                />
                            ): (
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    style={styles.textarea}
                                    value={addSafeSpotFormData[field.name]}
                                    onChangeText={text => setaddSafeSpotFormData({...addSafeSpotFormData, [field.name]: text})}
                                    placeholder={field.placeholder}
                                />  
                            )
                        }
                 </View>
                ))  
             
            }
            {  images.length === 0 && 
                <TouchableOpacity onPress={pickImage}>
                    <View style={styles.upload}>
                        <Text>Upload Pictures</Text>
                        <Text>Or Drag and Drop pictures here</Text>
                    </View>  
                </TouchableOpacity> 
            }
            {  images.length > 0 && 
                <View style={{position: 'relative'}}>
                     <TouchableOpacity onPress={pickImage}><View style={styles.imagesContainer}></View></TouchableOpacity>
                     <View style={{position: 'absolute', top: 26,left: 21, display: 'flex', flexDirection: 'row'}}>
                        {
                            images.map(image => (
                                <TouchableOpacity onPress={() => removeImage(image)} key={image} style={{position: 'relative'}}>
                                    <Image source={{ uri: image }} style={styles.image} />
                                    <TouchableOpacity style={{height: 70, width: 70}} >
                                        <Image source={require('../../assets/images/close.png')} style={styles.crossIcon} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>  
            }
            <Button
                buttonStyle={styles.submitBtn}
                onPress={onSubmit}
                title="Add Site"
                titleStyle={{fontWeight: 'bold' }}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    upload: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginHorizontal: 12,
        marginVertical: 20,
        borderWidth: 1,
        height: 80
    },

    crossIcon: {
        height: 18,
        position: 'absolute',
        width: 18,
        top: -70,
        left: 52
    },

    imagesContainer: {
        display: 'flex', 
        marginHorizontal: 12,
        marginVertical: 20,
        borderWidth: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        minHeight: 80
    },
    image: {
        width: 70, 
        height: 70,
        marginRight: 10,
        borderWidth: 1,
    },
    label: {
        marginVertical: 2,
        marginHorizontal: 12
    },
    input: {
        height: 40,
        marginVertical: 2,
        marginHorizontal: 12,
        borderWidth: 1,
        paddingHorizontal: 12
    },   
    textarea:{
        marginVertical: 2,
        marginHorizontal: 12,
        borderWidth: 1,
        paddingHorizontal: 12
    },
    field: {
        marginVertical: 12,
    },
    submitBtn: {
        backgroundColor: '#3399ff',
        height: 50,
        marginHorizontal: 12
    }
})


export default AddSafeDrinkingSpotComponent;