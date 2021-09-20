import React, { useState,useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView,Image, SafeAreaView, FlatList} from "react-native";

import fontKeys from '../../../keyText/fontKeys';
import textKeys from '../../../keyText/textKeys';
import TaxiTextInput from '../../common/TaxiTextInput';
import TaxiText from  '../../common/TaxiText';
import TaxiImageText from '../../common/TaxiImageText';
import TaxiText12Row from '../../common/TaxiText12Row';
import TaxiImageTextInput from '../../common/TaxiImageTextInput';
import TaxiTopBottomLeftRight from '../../common/TaxiTopBottomLeftRight';
import TaxiTextImage from '../../common/TaxiTextImage';
import DisplayFareScreen  from "../fare/DisplayFareScreen";
import TaxiButton from '../../common/TaxiButton';
import TaxiImageText12 from '../../common/TaxiImageText12';
import SmallStarComponent from '../../rate/SmallStarComponent';

import Rate from '../../rate/Rate';
import imageKeys from "../../../keyText/imageKeys";

import RideHistoryBlock from '../history/RideHistoryBlock';

import {Picker} from '@react-native-picker/picker';

import CheckBox from '@react-native-community/checkbox';

const RideDetailsScreen = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [user,setUser] = useState(null);
    const [details,setDetails] = useState(false);
    const [openModal,setOpenModal] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    openingSharePrice = () =>{setOpenModal(true); setDetails(true)} //en principe Details ride with contact driver should be set to true once there is a match only....
    /* 
    <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => {setToggleCheckBox(newValue);console.log("WElcome... to this bitch again...",toggleCheckBox)}}
            />
    */
  return (
        <SafeAreaView  style={{flex:1}}>
        <ScrollView  style={{flex:1,}}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#FFFFFF',paddingHorizontal:22,}}>
                <Pressable onPress={()=> { console.log('item')}}>
                <TaxiImageText12 
                    imageFunc={()=>console.log('item')}
                    style={{flex:1,}}
                    styleText1={{flex:1,flexWrap:'wrap',fontSize:18,color:'#000000'}}
                    styleText2={{flex:1,}}
                    imageStyle={{marginRight:15}}
                    textOnlyStyle={null}
                    image={imageKeys.profileblack} 
                    text={'textKeys.destination'} 
                    text1={'Mary J.'}
                    text2= {<SmallStarComponent nbre={4} color='black'/>}
                />
                </Pressable>
                <View style={{borderRadius:8, borderColor:'#C4C4C4',borderStyle:'solid',borderWidth:1.2,paddingHorizontal:14,paddingVertical:8,paddingBottom:8}}> 
                    <TaxiText text={ 'Plate #'} styleText={{flex:1,fontFamily:fontKeys.MR,color:'#878787',fontSize:12}} style={{alignItems:'flex-start'}}/>
                    <TaxiText text={ 'BEP-831'} styleText={{flex:1,fontFamily:fontKeys.MR,color:'#000000',fontSize:14}} />
                </View>
            </View>
            
            <View style={{flex:1,backgroundColor:'#F2B84D',paddingVertical:12,marginBottom:26}}>
                    <TaxiText text={ 'Ride Verification Code'} styleText={{flex:1,fontFamily:fontKeys.MR,color:'#000000',fontSize:12}}/>
                    <TaxiText text={ 'TA442'} styleText={{flex:1,fontFamily:fontKeys.MB,color:'#000000',fontSize:14}} />
            </View>
            <View  style={{borderBottomWidth:1,borderColor:'#EAEAEA',borderStyle:'solid'}}>
                    <Text style={{marginLeft:22, fontSize:16,fontFamily:fontKeys.MR}}>{textKeys.rider.details}</Text>
                    <View style={{flex:1,flexDirection:'row',paddingTop:28,}}>
                        <View style={{alignItems:'center',alignSelf:'flex-start',paddingLeft:43,paddingRight:11}}>
                            <View style={{backgroundColor:'#67F4A9',width:10,height:10,borderRadius:20}}/>
                            <View  style={{borderLeftColor:'#222222',borderLeftWidth:1,borderLeftStyle:'solid',paddingBottom:28,width:2}}/>
                            <View style={{backgroundColor:'#222222',width:10,height:10,borderRadius:20}}/>
                        </View>
                        <View style={{flex:1,paddingBottom:28,marginTop:-3}}>
                             <TaxiText text={'departure'} styleText={{fontSize:12,color:'#878787',fontFamily:fontKeys.MR,paddingBottom:20}} 
                             style={{paddingTop:0, paddingBottom:0, marginTop:0,marginBottom:0}}/>
                             <TaxiText text="destination" styleText={{fontSize:12,color:'#878787',fontFamily:fontKeys.MR}} 
                              style={{paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0}}/>
                        </View>
                    </View>
            </View>
            <TaxiText12Row 
                style={{paddingLeft:22}}
                textTopLeft={textKeys.rider.arrival} 
                textTopLeftStyle={{color:'#000000',fontSize:16,fontFamily:fontKeys.MR}} 
                textTopRight="9:34 PM" /> 

           

            {details?  <TaxiText12Row 
                style={{paddingLeft:22}}
                textTopLeft={textKeys.rider.price} 
                textTopLeftStyle={{color:'#000000',fontSize:16,fontFamily:fontKeys.MR}} 
                textTopRight="1000 F FCFA" 
            /> :
            <TaxiTopBottomLeftRight 
                style={{paddingLeft:22}}
                textTopLeft={textKeys.rider.price}
                styleTopLeft={{color:'#000000',fontSize:16,fontFamily:fontKeys.MR}} 
                 styleBottomLeft={{color:'#5BE39B',fontSize:16,fontFamily:fontKeys.MR}} 
                 textBottomLeft={textKeys.rider.split} 
                 styleTopRight={{color:'#000000',fontSize:16,fontFamily:fontKeys.MB}} 
                 textTopRight={ "1000 F FCFA"} 
                 rating={'rating'}
                 funcBottomLeft={openingSharePrice}
            />
            } 

           {details?  <TaxiTextImage  text={textKeys.rider.share}  textStyle={{color:'#FFFFFF',fontFamily:fontKeys.MMR,fontSize:14}} image={imageKeys.arrow} style={{backgroundColor:'#222222',alignItems:'center',justifyContent:'center',paddingVertical:14}} imageStyle={{height:14,width:14,marginLeft:4}}/>
            :
            <View style={{flex:1,backgroundColor:'#222222',flexDirection:'row',justifyContent:'center',paddingVertical:20}}>
                <TaxiTextImage  style={{justifyContent:'center',alignItems:'center',paddingRight:29}} 
                textStyle ={{fontSize:14, color:'#F2B84D',fontFamily:fontKeys.MMR}}
                 text={textKeys.rider.contact} image={imageKeys.contactdriver} />
                <View style={{borderStyle:'solid',borderColor:'white',borderWidth:1}}/>
                <TaxiTextImage style={{justifyContent:'center',alignItems:'center',paddingLeft:41}}  
                textStyle ={{fontSize:14, color:'#FFFFFF',fontFamily:fontKeys.MMR}} 
                text={textKeys.rider.cancel} image={imageKeys.closewhite}  
            /> 
            </View>}
        </ScrollView>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    
});

export default RideDetailsScreen;