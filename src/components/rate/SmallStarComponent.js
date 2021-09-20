/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState} from 'react';
import {
    View,Image,StyleSheet,Pressable
} from 'react-native';



import fontKeys from '../../keyText/fontKeys';
import imageKeys from '../../keyText/imageKeys';

import textKeys from '../../keyText/textKeys';

import TaxiButton from '../common/TaxiButton'
import TaxiTextInput from '../common/TaxiTextInput'
import TaxiText from  '../common/TaxiText';

import TaxiImageText  from '../common/TaxiImageText';

const SmallStarComponent: () => React$Node = (props) => {
    const [star,setStar] = useState(props.nbre);
    const number = [1,2,3,4,5];

  return (
    <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}> 
    { number.map( x => {
        return <Image   key={x} source={star >=x ? (props.color? imageKeys.starblacksmall: imageKeys.smallstar) : null } />
      })
    }   
    </View>
  );
};

const styles = StyleSheet.create({
 

});

export default SmallStarComponent;
