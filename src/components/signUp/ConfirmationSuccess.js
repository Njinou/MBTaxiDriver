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

const ConfirmationSuccess: () => React$Node = () => {


  return (
    <View style={{height:'100%'}}>
        <Image style={{marginBottom:29,marginTop:'auto',alignSelf:'center'}} source={imageKeys.confirmationwhite} />
        <TaxiText styleText={{alignSelf:'center',fontSize:20,fontFamily:fontKeys.MR,color:'white'}} text={textKeys.confirmAccount.allSetUp}/>
        <View style={{justifyContent:'flex-start',alignItems:'center',marginTop:'auto'}}>
        <TaxiButton style={{marginBottom:84}} text={textKeys.ok}/>
        </View>
        
    </View>
  );
};

const styles = StyleSheet.create({
 

});

export default ConfirmationSuccess;
