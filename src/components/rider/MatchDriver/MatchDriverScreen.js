import React, { useState,useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView,Image } from "react-native";

import fontKeys from '../../../keyText/fontKeys';
import textKeys from '../../../keyText/textKeys';
import TaxiTextInput from '../../common/TaxiTextInput';
import TaxiText from  '../../common/TaxiText';
import TaxiImageText from '../../common/TaxiImageText';

import Rate from '../../rate/Rate';
import imageKeys from "../../../keyText/imageKeys";
import RideDetailsScreen from "../rideDetails/RideDetailsScreen";

const MatchDriverScreen = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isSearching,setIsSearching] = useState(false); 
     const [input,setInput] = useState(null); 
     setVisibleFunc = () =>  setModalVisible(!modalVisible);
    getTextInput = (val) =>  {
      setInput (val);
      val.length >0 ? setIsSearching(true) : setIsSearching(false);
    }
  return (
    <View style={styles.centeredView}>
      <View  style={[{marginTop:'auto',justifyContent:'center'}]}>
            <TaxiImageText image={imageKeys.taxisearch} text={textKeys.rider.driver.match}  
            style={{
                marginLeft:-38,borderBottomColor:'#EAEAEA',borderBottomStyle:'solid',
                borderBottomWidth:1,width:'100%',
                paddingLeft:35,alignSelf:'center',
                shadowColor: 'red',//'rgba(170,170,170,0.5)',
                shadowOffset:{width:0,height:2},
                shadowOpacity:0,
                shadowRadius:22
            }}
            textStyle={{color:'#000000',fontFamily:fontKeys.MR,fontSize:18}}
            />
            <View style={{justifyContent:'center',alignItems:'center',paddingTop:58,paddingBottom:71}}>
                <TaxiText text={textKeys.rider.driver.wait} styleText={{paddingBottom:22,color:'#878787',fontSize:14,fontFamily:fontKeys.MR}}/>
                <Image source={imageKeys.loading} />
            </View>
        </View>
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
    justifyContent:'space-evenly',
   
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
  },
  textInfo:{
    textAlign:'center',
    color:'#000000',
    fontFamily:fontKeys.MR,
    paddingLeft:25,
    paddingRight:25,
    paddingBottom:16,
    paddingTop:16,
    fontSize:18,
}
});

export default MatchDriverScreen;