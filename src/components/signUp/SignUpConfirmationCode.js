/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet,View,Image,Text} from 'react-native';

import fontKeys from '../../keyText/fontKeys';
import imageKeys from '../../keyText/imageKeys';

import textKeys from '../../keyText/textKeys';

import TaxiButton from '../common/TaxiButton'
import TaxiTextInput from '../common/TaxiTextInput'
import TaxiText from  '../common/TaxiText';

const SignUpConfirmationCode: (props) => React$Node = (props) => {
  
  return (
    <View style={{height:'100%'}}>
        <Image style={{marginBottom:36,marginTop:'auto',alignSelf:'center'}} source={imageKeys.verifyEmail} />
        <TaxiText styleText={{paddingBottom:17,paddingTop:36,alignSelf:'center',fontSize:20,fontFamily:fontKeys.MR,color:'white'}} text={textKeys.confirmAccount.verifYEmail}/>
        <TaxiText styleText={{alignSelf:'center',fontSize:16,fontFamily:fontKeys.MR,color:'white'}} text={textKeys.confirmAccount.textcodeVerification}/>
        <TaxiText styleText={{paddingBottom:111,alignSelf:'center',fontSize:16,fontFamily:fontKeys.MR,color:'white'}} text={'nitcheupascal@gmail.com'}/>
        <View style={{justifyContent:'flex-start',alignItems:'center',marginTop:'auto'}}>
        <TaxiTextInput  placeholder={textKeys.confirmAccount.codeVerification} func={props.getCode} value={props.code}/>
        <TaxiButton  text={textKeys.submit} func={props.func}/>
        <TaxiText style={{paddingBottom:44,paddingTop:25}} text={textKeys.confirmAccount.resendCode}/>
        </View>
        
    </View>
  );
};

const styles = StyleSheet.create({
 

});

export default SignUpConfirmationCode;
