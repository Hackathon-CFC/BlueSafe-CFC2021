import React  from "react";
import {
  Modal, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image
} 
from "react-native";

const SuccessDialog = ({setShowSuccessDialog}) => {
 
  return (
    <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
      <View style={styles.centeredView}>
        <Modal
          style={{borderWidth:0,borderColor:'none', height: '100%', width: '100%'}}
          animationType="slide"
          transparent={true}
        >
          <TouchableOpacity onPress={() => setShowSuccessDialog(false)} style={{height: 70, width: 70, position: 'absolute', top: '15%',display: 'flex',right: -23, zIndex: 1000}} >
              <Image source={require('../assets/images/close.png')} style={styles.crossIcon} />
          </TouchableOpacity>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Image source={require('../assets/images/thumbs_up.jpg')} style={styles.thanksICon} />
                <View>
                    <Text style={styles.label} >Thanks for sharing the</Text>
                    <Text style={styles.label} >information.</Text>
                </View>
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
    alignItems: "center",
    marginTop: 40
  },
  submitBtn: {
    backgroundColor: '#737373',
    height: 50
  },
  modalView: {
    width: '93%',
    marginVertical: 50,
    backgroundColor: "white",
    paddingHorizontal: 35,
    paddingVertical: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
  },
  label :{
    fontWeight: 'bold',
    color: '#4d5358',
    fontSize: 16
  },
  heading:{
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 15
  },
 
  crossIcon: {
    height: 25,
    width: 25
  },
  thanksICon: {
    height: 140,
    width:  150
  }
 
});

export default SuccessDialog;