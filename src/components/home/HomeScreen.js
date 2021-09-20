
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet,View,Image,ImageBackground, ScrollView,Text} from 'react-native';

import fontKeys from '../../keyText/fontKeys';
import imageKeys from '../../keyText/imageKeys';

import textKeys from '../../keyText/textKeys';

import TaxiButton from '../common/TaxiButton'
import TaxiTextInput from '../common/TaxiTextInput'
import TaxiText from  '../common/TaxiText';

import ModalComponent from '../common/ModalComponent';

const logo = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width: 64,
    height: 64
  };

const HomeScreen: (props) => React$Node = (props) => {

  return (
    <View style={{height:'100%'}}>
        <ImageBackground source={imageKeys.map} style={styles.image}>
            <Image  source={imageKeys.menu}  style={{marginLeft:20,marginBottom:25,marginTop:25}}/>
            <TaxiText 
                styleText={{color:'#000000',fontSize:12,fontFamily:fontKeys.MR,textAlign:'center'}}  
                style={{paddingLeft:15,alignItems:'center',justifyContent:'center',paddingBottom:13}} 
                text= {textKeys.driverReminder}
            />
            <View style={{flexDirection:'row',justifyContent:'space-around',flex:1}}>
                <View style={{alignSelf:'stretch',flex:1}}>
                    <TaxiButton 
                        style={[styles.cashButton,{
                            marginLeft:60,
                            marginRight:'-19.5%',
                            fontSize:14,
                            fontFamily:props.offline? fontKeys.MR : fontKeys.MSB,
                            backgroundColor: props.color1? props.color1:'white',
                            //borderStyle:'solid',
                        // borderWidth:2,
                        // borderColor:'#04506E',
                            shadowColor: 'rgba(0,0,0,0.26)',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 2,
                            shadowRadius: 4,
                            elevation:5,
                        }]} 
                        textStyle={[styles.cashOut,{color:props.textColor1? props.textColor1:'#58585C',
                        fontFamily:props.offline? fontKeys.MB : fontKeys.MR,
                        paddingTop:9,
                        paddingBottom:9,}]} 
                        text={textKeys.offline}
                    />
                    </View>
                    <View style={{alignSelf:'stretch',flex:1,marginRight:20}}>
                        <TaxiButton 
                            style={{ marginLeft:'-19.5%',marginRight:60,backgroundColor:props.color2? props.color2:'#18BEAE'}} 
                            textStyle={[styles.cashOut,{paddingTop:9,
                                paddingBottom:9,color:props.textColor1? props.textColor2:'#FFFFFF',
                                fontFamily:props.offline? fontKeys.MR : fontKeys.MB,
                                fontSize:14}]} 
                            text={textKeys.online}
                        />
                </View>
        </View>
        
            {props.Component}
         
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
      //  justifyContent: "center",
        alignSelf:'stretch',
        backgroundColor:'white',
      },
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
        color:'white',fontSize:14,
        fontFamily:fontKeys.MSB,
        textShadowColor: 'rgba(4,80,110,0.5)', 
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
       // paddingLeft:6,
       // paddingRight:6
    },
});

export default HomeScreen;

