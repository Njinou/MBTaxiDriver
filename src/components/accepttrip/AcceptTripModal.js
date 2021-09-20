//,borderStyle:'solid',borderBottomWidth:1,borderBottomColor:'#DBDBDB',
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View ,Image,ScrollView} from "react-native";

import fontKeys from '../../keyText/fontKeys';
import imageKeys from '../../keyText/imageKeys';

import textKeys from '../../keyText/textKeys';

import TaxiButton from '../common/TaxiButton'
import TaxiTextInput from '../common/TaxiTextInput'
import TaxiText from  '../common/TaxiText';

import TaxiImageText  from '../common/TaxiImageText';


const AcceptTripModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <ScrollView contentContainerStyle={styles.modalView} >
                <View style={{justifyContent:'center',borderStyle:'solid',borderBottomWidth:1,borderBottomColor:'#EAEAEA',alignItems:'center'}}> 
                    <TaxiText styleText={{color:'#000000',fontSize:18,fontFamily:fontKeys.MR,textAlign:'center',paddingBottom:19,paddingTop:18}} text={textKeys.acceptTrip.acceptTrip}/>
                </View>

                <View style={{flexDirection:'column',justifyContent:'center',borderStyle:'solid',borderBottomWidth:1,borderBottomColor:'#EAEAEA',alignItems:'center'}}> 
                    <TaxiText styleText={{color:'#000000',fontSize:24,fontFamily:fontKeys.MB,textAlign:'center',paddingTop:26}} text="10 mi"/>
                    <View style={{flexDirection:'row',paddingBottom:26}}>
                        <TaxiText styleText={{color:'#000000',fontSize:18,fontFamily:fontKeys.MR,textAlign:'center'}} text={textKeys.acceptTrip.trip}/>
                        <TaxiText styleText={{color:'#000000',fontSize:18,fontFamily:fontKeys.MB,textAlign:'center'}} text= {" $" + "15"}/>
                    </View>
                </View>

                <View style={{flexDirection:'column',justifyContent:'center',borderStyle:'solid',borderBottomWidth:1,borderBottomColor:'#EAEAEA',alignItems:'center'}}> 
                    <TaxiText styleText={{color:'#000000',fontSize:16,fontFamily:fontKeys.MB,textAlign:'center',paddingBottom:8,paddingTop:25}} text={textKeys.pickup +" " + textKeys.location}/>
                    <TaxiText styleText={{color:'#000000',fontSize:18,fontFamily:fontKeys.MR,textAlign:'center'}} text=" 461 University Dr."/>
                    <TaxiText styleText={{color:'#000000',fontSize:18,fontFamily:fontKeys.MR,textAlign:'center',paddingBottom:27}} text="Durham, NC"/>
                </View>
                
                <View>
                    <View style={{flexDirection:'column',justifyContent:'space-around',borderStyle:'solid',borderBottomWidth:1,borderBottomColor:'#DBDBDB',alignItems:'center',paddingBottom:34}}> 
                            <View style={{alignItems:'center',justifyContent:'center',alignSelf:'center',flexDirection:'row',marginTop:16}}>
                                <Image source={imageKeys.profileblack}/>
                                <View style={{paddingLeft:15}}>
                                    <TaxiText styleText={{color:'#000000',fontSize:18,fontFamily:fontKeys.MR,}} text= {"Mary J."}/>
                                    <TaxiText styleText={{color:'#000000',fontSize:14,fontFamily:fontKeys.MR}} text= {"rating here"}/>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-around',}}>
                                <TaxiButton 
                                    style={[styles.cashButton,{fontSize:18, fontFamily:fontKeys.MSB,backgroundColor:'white',borderStyle:'solid',borderWidth:2,borderColor:'#04506E',
                                    shadowColor: '#04506E',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0,
                                    shadowRadius: 2,
                                    elevation:5,
                                  }]} 
                                    textStyle={[styles.cashOut,{color:'#3E3E39',fontFamily:fontKeys.MSB}]} 
                                    text={textKeys.reject}
                                />
                                <TaxiButton 
                                    style={styles.cashButton} 
                                    textStyle={styles.cashOut} 
                                    text={textKeys.accept}
                                />
                            </View>
                            
                    </View>
                </View>
                
                <Pressable
                        style={[styles.button, styles.buttonClose,{marginTop:20}]}
                         onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>Hide Modal TO BE REMOVED AND FUNCTIONNALTY ADDED TO ACCEPT AND REJECT</Text>
                </Pressable>
          </ScrollView>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 45,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalViewScrollView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 45,
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
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  cashButton:{
    backgroundColor:'#18BEAE',
    borderRadius:4.09, 
    shadowColor: '#18BEAE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 2,  
    elevation: 5,
    fontSize:18,

},
cashOut:{
    color:'white',
    fontSize:22,
    fontFamily:fontKeys.MSB,
    textShadowColor: 'rgba(4,80,110,0.5)', 
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,    
    paddingLeft:15,
    paddingRight:15
},
image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignSelf:'stretch'
  },
});

export default AcceptTripModal;