import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

import SmallStarComponent from '../rate/SmallStarComponent';
import TaxiImageText12 from '../common/TaxiImageText12';
import fontKeys from '../../keyText/fontKeys';

const TaxiTopBottomLeftRight = (props) => {
    return (
        <View  style={[{borderStyle:'solid',borderColor:'#F2F2F2',borderWidth:1,padding:15},props.style]}>
            <View style={{justifyContent:'space-between',flexDirection:'row'}}>  
                <Text style={[styles.topText,props.styleTopLeft]}>{props.textTopLeft? props.textTopLeft : 'Ride With' }</Text>
                <Text style={[styles.topText,{fontFamily:fontKeys.MB},props.styleTopRight]}> {props.textTopRight? props.textTopRight : '$15'}</Text>
            </View>

            <View style={{justifyContent:'space-between',flexDirection:'row'}}>  
                {props.ComponentBottomLeft? props.ComponentBottomLeft : <Text style={[styles.topText,{color:'#878787',fontSize:11},props.styleBottomLeft]} onPress={props.funcBottomLeft}>{props.textBottomLeft? props.textBottomLeft : 'MBTaxi' }</Text>}
                {props.BottomRightComponent? props.BottomRightComponent: <SmallStarComponent nbre={props.rating?props.rating:5}/>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topText:{
        color:'#000000',fontFamily:fontKeys.MR,fontSize:14
    },
  });

export default TaxiTopBottomLeftRight;
              