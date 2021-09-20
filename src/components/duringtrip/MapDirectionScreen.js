/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet,View,Image,Text,ImageBackground,ScrollView} from 'react-native';

import fontKeys from '../../keyText/fontKeys';
import imageKeys from '../../keyText/imageKeys';

import textKeys from '../../keyText/textKeys';

import TaxiButton from '../common/TaxiButton'
import TaxiTextInput from '../common/TaxiTextInput'
import TaxiText from  '../common/TaxiText';

import TaxiImageText  from '../common/TaxiImageText';


const MapDirectionScreen: () => React$Node = () => {
//maplightgrey@2x.png
  return (
    <View>
        <View style={{paddingLeft:15,paddingTop:21,backgroundColor:'black',alignItems:'flex-start'}}>  
            <Image  source={imageKeys.backarrowlarge} style={{marginBottom:27}} />
            <TaxiText styleText={{color:'#FFFFFF',fontSize:30,fontFamily:fontKeys.MR,fontWeight:'bold',paddingBottom:5}} text= {"0.5 mi"}/>
            <TaxiText styleText={{color:'#FFFFFF',fontSize:25,fontFamily:fontKeys.MR,paddingBottom:15}} text= {"Continue Straight"}/>
        </View>
        <TaxiText 
                styleText={{color:'#FFFFFF',fontSize:16,fontFamily:fontKeys.MR,}}  
                style={{paddingLeft:15,backgroundColor:'#3E3E39',alignItems:'flex-start',justifyContent:'center',paddingBottom:11,paddingTop:11}} 
                text= {"To University Drive"}
        />
        
        <Image  source={imageKeys.mapscreenshot} />

        <View style={[styles.bottomContainer,{flexDirection:'row'}]}>
            <View  style={{flex:3}}>
                <View style={{flexDirection:'row',justifyContent:'space-around',paddingTop:27}}>
                    <TaxiText styleText={{color:'#000000',fontSize:26,fontFamily:fontKeys.MR,paddingBottom:15,fontWeight:'bold'}} text= {"9:50"}/>
                    <TaxiText styleText={{color:'#000000',fontSize:26,fontFamily:fontKeys.MR,paddingBottom:15,fontWeight:'bold'}} text= {"5"}/>
                    <TaxiText styleText={{color:'#000000',fontSize:26,fontFamily:fontKeys.MR,paddingBottom:15,fontWeight:'bold'}} text= {"2.5"}/>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <TaxiText styleText={{color:'#000000',fontSize:20,fontFamily:fontKeys.MR,paddingBottom:15}} text= {textKeys.arrival}/>
                    <TaxiText styleText={{color:'#000000',fontSize:20,fontFamily:fontKeys.MR,paddingBottom:15}} text= {textKeys.min}/>
                    <TaxiText styleText={{color:'#000000',fontSize:20,fontFamily:fontKeys.MR,paddingBottom:15}} text= {textKeys.mi}/>
                </View>
            </View>
            
            <View style={{flex:1,alignSelf:'center'}}>
             <TaxiButton text={textKeys.end}  textStyle={{color:'#3E3E39',fontFamily:fontKeys.MSB,fontSize:18}} />
            </View>
            
                        
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    cashButton:{
        backgroundColor:'#18BEAE',
        borderRadius:4.09, 
        shadowColor: '#18BEAE',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 2,  
        elevation: 5,
       // marginTop:23,
       // marginBottom:24
       paddingLeft:0,
       paddingRight:0,
    },
    cashOut:{
        color:'white',fontSize:22,
        fontFamily:fontKeys.MSB,
        textShadowColor: 'rgba(4,80,110,0.5)', 
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
       // paddingLeft:6,
       // paddingRight:6
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignSelf:'stretch'
      },
      bottomContainer:{
        backgroundColor:'white',
        justifyContent:'space-between',
        marginTop:'auto',
        shadowColor:  'rgba(170,170,170,0.5)',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 22,
        shadowRadius: 0,  
        elevation: 5,

 }
      
});

export default MapDirectionScreen;
