import React, { useState,useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView,FlatList ,Image} from "react-native";

import fontKeys from '../../../keyText/fontKeys';
import textKeys from '../../../keyText/textKeys';
import TaxiTextInput from '../../common/TaxiTextInput';
import TaxiText from  '../../common/TaxiText';
import TaxiImageText from '../../common/TaxiImageText';

import Rate from '../../rate/Rate';
import imageKeys from "../../../keyText/imageKeys";

import ModalText from '../../common/ModalText';
import RideHistoryBlock from '../history/RideHistoryBlock';
import TaxiText12Row from '../../common/TaxiText12Row';


const DisplayFareSplittedScreen = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isSearching,setIsSearching] = useState(false); 
    const [input,setInput] = useState(null); 
   setVisibleFunc = () =>  setModalVisible(!modalVisible);
     getTextInput = (val) =>  {
        setInput (val);
        val.length >0 ? setIsSearching(true) : setIsSearching(false);
    }
    //edit amount 
    //remove friend
    //
    /*
     <TaxiText12Row   textTopLeft={item.displayName}  textTopLeftStyle={{fontSize:16,color:'#000000'}} 
        textTopRight="1000 FCFA" style={{borderWidth:0,justifyContent:'space-between'}}
         RightComponent={<TaxiText  styleText={{color:'#000000',fontSize:16,fontFamily:fontKeys.MB,paddingTop:11,paddingBottom:11,paddingRight:15,paddingLeft:15}} 
        style={{alignSelf:'flex-start',borderColor:'#DBDBDB',borderWidth:1.5,borderStyle:'solid',marginLeft:'auto',borderWidth:0}} text={ pu + " F. CFA"}/>}/>
       
     <Modal
            animationType='fade'
            transparent={true}
            visible={true}>
              <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <Text style={{flex:1}}>
                  adsasada 1  asd asd
                </Text>
                <Text style={{flex:1}}>
                  adsasada  2  asd asd
                </Text>
                <Text style={{flex:1}}>
                  adsasada 3 asd asd
                </Text>

              </View>
        </Modal>
    
    */
   //somme d

/*
    const Item = ({ item,index }) => (
      <View  style={{flex:1,flexDirection:'row',alignItems:'center'}}>
         <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}> 
            <TaxiText text ={item.displayName}  styleText={{fontSize:16,color:'#000000'}} />
              <TaxiTextInput  func={(val) => props.updatePriceCopayer(item,val)} 
              value={typeof (item.price) === 'string'? item.price : JSON.stringify(item.price)} 
              placeholder={props.pu} style={{marginBottom:0,marginLeft:'auto',marginRight:5,paddingRight:10, color:'#000000',
                fontSize:16,fontFamily:fontKeys.MB,}}/>
              <TaxiText text ="F. CFA" styleText={{color:'black',fontSize:16,fontFamily:fontKeys.MB}}/>         
        </View>
        <Pressable onPress={()=>{
          props.updatePriceCopayer(item,750)
          //props.removingCopayer(item);
         //props.updatePriceCopayer(item,props.)
        }}>
          <Image source={imageKeys.threedots} style={{width:50, height:50}}/>
        </Pressable> 
      </View>
    );

   const renderItem = ({ item,index }) => (
      <Item item={item} index={index} />
    );*/
    //
    //inputs[index]

 
    /*gettingNewPriceVal ={gettingNewPriceVal}
                  inputsTrueFalse ={inputsTrueFalse}
                  inputs ={inputs}
                  */
    const renderItem = ({item,index})=>(
      <View  style={{flex:1,flexDirection:'row',alignItems:'center'}}>
         <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}> 
            <TaxiText text ={item.displayName}  styleText={{fontSize:16,color:'#000000'}} />
            <TaxiTextInput
             func={(val) => props.gettingNewPriceVal(val,index)}
             value={props.inputsTrueFalse[index]? props.inputs[index]:item.price + ''}  
                style={{flex:1,alignSelf:'stretch',marginBottom:0,marginRight:1,paddingRight:10, color:'#000000',
                fontSize:16,fontFamily:fontKeys.MB,}} placeholder={item.price}/>
              <TaxiText text ="F. CFA" styleText={{color:'black',fontSize:16,fontFamily:fontKeys.MB}}/> 
                      
        </View>
        <Pressable onPress={()=>{
          props.updatePriceCopayer(item,750)
          //props.removingCopayer(item);
         //props.updatePriceCopayer(item,props.)
        }}>
          <Image source={imageKeys.threedots} style={{width:50, height:50}}/>
        </Pressable> 
      </View>
    )
      const [inputShit,setInputShit] = useState('');
  return (
          <ScrollView  contentContainerStyle={[styles.modalView,]}>
                <View 
                    style={{ 
                        borderBottomStyle:'solid',
                        borderBottomColor:'#EAEAEA',
                        borderBottomWidth:1,
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                >
                    <Text style={styles.textInfo}> {textKeys.rider.fare.split.info}</Text>
                </View>

                <View 
                    style={{ 
                        alignSelf:'flex-start',
                        alignSelf:'center',
                        justifyContent:'center',
                        paddingTop:30, 
                        paddingBottom:24,
                        borderBottomStyle:'solid',
                        borderBottomColor:'#EAEAEA',
                        borderBottomWidth:1,
                    }}
                >
                    <Text>
                        <Text style={[styles.textInfo,{fontSize:24}]}>{textKeys.rider.fare.split.price}</Text>
                        <Text style={[styles.textInfo,{fontSize:24,fontFamily:fontKeys.MB}]}> {props.rideDetails.prixTotal}</Text>
                    </Text>
                   
              </View>
              
                <View style={{paddingBottom:20.5,paddingTop:10}}>
                    <FlatList
                      data={props.copayer}
                      refreshing={true}
                      extraData={props.copayer}
                      renderItem={(item,index) => renderItem(item,index)}
                      keyExtractor={item => item.uid}
                    />
                </View>
                <TaxiImageText func={props.func} image={imageKeys.plusgreen} style={{alignSelf:'flex-start'}} textStyle={{color:'#5BE39B',fontSize:14,fontFamily:fontKeys.MR}} text={textKeys.rider.fare.split.addPerson}/>
                <Pressable onPress={props.closingModal}>
                  <View style={{backgroundColor:'#222222',marginTop:'auto',padding:30,margin:-36,borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
                      <TaxiText  text={textKeys.rider.fare.split.split} styleText={{color:'#FFFFFF',fontSize:14,fontFamily:fontKeys.MMR,textShadowColor:'rgba(4,80,110,0.5)',textShadowOffset:{width:1,height:1},textShadowRadius:1}}/>
                  </View>
                </Pressable>
            </ScrollView>
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
    marginTop:'auto',
    marginBottom:'auto',  
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

export default DisplayFareSplittedScreen;