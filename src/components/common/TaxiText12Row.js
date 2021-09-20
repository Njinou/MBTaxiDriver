import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

import SmallStarComponent from '../rate/SmallStarComponent';
import TaxiImageText12 from '../common/TaxiImageText12';
import fontKeys from '../../keyText/fontKeys';
const TaxiText12Row = (props) => {
    return (
        <View  style={[{borderStyle:'solid',borderColor:'#F2F2F2',borderWidth:1,padding:15},props.style]}>
            <View style={[{justifyContent:'space-between',flexDirection:'row',alignItems:'center'},props.petitStyle]}>  
            {props.LeftComponent?  props.LeftComponent :<Text style={[styles.topText,props.textTopLeftStyle]} onPress={props.text1Func}>{props.textTopLeft? props.textTopLeft : 'Ride With' }</Text>}
                {props.RightComponent?  props.RightComponent :<Text style={[styles.topText,{fontFamily:fontKeys.MB},props.textTopRightStyle]} onPress={props.text2Func}> {props.textTopRight? props.textTopRight : '$15'}</Text>}
            </View>
        </View>
    );//textTopLeft textTopRight
}

const styles = StyleSheet.create({
    topText:{
        color:'#000000',fontFamily:fontKeys.MR,fontSize:14
    },
  });

export default  TaxiText12Row ;
              