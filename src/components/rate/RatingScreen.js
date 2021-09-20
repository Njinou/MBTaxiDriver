import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

import fontKeys from '../../keyText/fontKeys';
import imageKeys from '../../keyText/imageKeys';
import textKeys from '../../keyText/textKeys';
import TaxiButton from '../common/TaxiButton'
import TaxiTextInput from '../common/TaxiTextInput'
import TaxiText from  '../common/TaxiText';
import TaxiImageText  from '../common/TaxiImageText';
import SmallStarComponent from '../rate/SmallStarComponent';
import Rate from './Rate';
//props.rate
const RatingScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.openingModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          props.setModalVisible(!props.openingModal);
        }} 
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TaxiText style={{paddingBottom:40}} styleText={{color:'#000000',fontFamily:fontKeys.MR,fontSize:18,textAlign:'center'}} func={props.setVisibleFunc}  text={ props.text? props.text: textKeys.rideReview + " "+ "Mary" +"?"}/>  
            
            {props.noRate? null: 
              <View style={{paddingBottom:40}}>    
                 <Rate star={props.rate} setStar={props.settingRating}/>
              </View>
            }
           <TaxiTextInput  keyboardType={props.keyboardType}  placeholder={props.placeholder? props.placeholder: textKeys.comment} style={{alignSelf:'stretch',marginBottom:54}} value={props.comment} func={props.getComment} />
            <TaxiText style={{marginTop:'auto'}} styleText={{color:'#F2B84D',fontFamily:fontKeys.MSB,fontSize:12,textAlign:'center'}} func={props.setVisibleFunc}  text={props.textButton? props.textButton: textKeys.done}/>           
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  //  alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
  // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent:'space-evenly'
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
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default RatingScreen;