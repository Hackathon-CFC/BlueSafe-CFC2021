import React, { useState } from "react";
import {
  Modal, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity , 
  ActivityIndicator,
  Image
} 
from "react-native";
import { Button } from 'react-native-elements';
import useAPI from '../service/apiService';
import globalConstant from '../constant/globalConstant';
import {Picker} from "@react-native-picker/picker";
import RadioForm from 'react-native-simple-radio-button';

const NotificationDialog = ({setShowNotificationModal, onSuccess, favSpots}) => {
  const { postRequest, ENDPOINTS } = useAPI();
  const fields = globalConstant.notificationFields
  const [notificationData, setNotificationData] = useState(fields.reduce((initialData, field) => ({...initialData, [field.name]: ''}), {}));
  const [showLoader, setShowLoader] = useState(false);

  const onSubmit = async () => {
    setShowLoader(true);
    postRequest(ENDPOINTS.addFeedback, 
      {
        feedback: {
          "actual": notificationData.actual,
          "quality": notificationData.quality,
          "comment": notificationData.comment,
          mobile: "8800822710"
        }, 
        "_id": notificationData.id
      }).then(() => {
      setShowNotificationModal(false);
      onSuccess();
    })
    .catch(error => {
      console.log(error.message);
    });
}

  return (
    <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', top: '10%'}}>
      {showLoader &&
        <View style={{ height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#c1c7cd" />
        </View>
      }
      <View style={styles.centeredView}>
        <Modal
          style={{borderWidth:0,borderColor:'none', height: '100%', width: '100%'}}
          animationType="slide"
          transparent={true}
        >
          <TouchableOpacity onPress={() => setShowNotificationModal(false)} style={{height: 70, width: 70, position: 'absolute', top: '5%',display: 'flex',right: 0, zIndex: 1000}} >
              <Image source={require('../assets/images/close.png')} style={styles.crossIcon} />
          </TouchableOpacity>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.heading}>Notification</Text>
              <Text style={{fontSize: 14, marginBottom: 15, color: '#737373'}}>Please answer few questions</Text>
              
              {
                fields.map(field => (
                  <View key={field.name}>
                      { field.type === 'select' && 
                      <View style={styles.section}>
                        <Text style={styles.label}>{field.label}</Text>
                        {
                          favSpots.length > 0 && 
                          <Picker
                              selectedValue={notificationData[field.name]}
                              style={styles.input}
                              onValueChange={(itemValue) => {
                                setNotificationData({...notificationData, [field.name]: itemValue})
                              }}

                          >
                             <Picker.Item key={'3333'} label='Select Spot' value="" />
                            {
                               
                                favSpots.map((spot, index) => (
                                  <Picker.Item key={index} label={spot.name} value={spot._id} />
                                ))  
                            }
                          </Picker>
                        }
                        
                      </View>
                    }
                    { field.type === 'radio' && 
                        <View style={styles.section}>
                          <Text style={styles.label}>{field.label}</Text>
                          <View style={{...styles.fieldOption, width: '50%'}} >
                          <RadioForm
                            style={{justifyContent: 'space-between'}}
                            formHorizontal={true}
                            labelHorizontal={true}
                            buttonColor={'#000'}
                            buttonSize={12}
                            initial={null}
                            radio_props={field.options}
                            onPress={(value) => setNotificationData({...notificationData, [field.name]:value})}
                          />
                          </View>
                      </View> 
                    }
                    {
                      field.type === 'textarea' && 
                      <View style={styles.section}>
                          <Text style={styles.label} >{field.label}</Text>
                          <TextInput
                              multiline={true}
                              numberOfLines={6}
                              style={styles.textarea}
                              value={notificationData[field.name]}
                              onChangeText={text => setNotificationData({...notificationData, [field.name]: text})}
                          />            
                      </View>
                    }
                  </View>    
                ))
              }
              <Button
                  disabled={!notificationData.id || !notificationData.quality || !notificationData.actual}
                  onPress={onSubmit}
                  buttonStyle={styles.submitBtn}
                  title="Submit"
                  titleStyle={{fontWeight: 'bold' }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center"
  },
  submitBtn: {
      backgroundColor: '#737373',
      height: 50
  },
  modalView: {
    width: '93%',
    marginVertical: 20,
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 15
  },
  textarea:{
    marginVertical: 2,
    borderWidth: 1,
    paddingHorizontal: 12
  },
  field:{
    display: 'flex', 
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between'
  },
  label :{
    fontWeight: 'bold',
    color: '#737373'
  },
  heading:{
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 15
  },
  fieldOption: {
    display: 'flex', 
    flexDirection: 'row'
  },
  crossIcon: {
    height: 25,
    width: 25,
    marginLeft: 19
  },
  input: {
    height: 40,
    marginVertical: 2,
    borderWidth: 1,
    paddingHorizontal: 12
  }
});

export default NotificationDialog;