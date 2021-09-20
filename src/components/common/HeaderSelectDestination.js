import React from 'react';
import {View,Pressable} from 'react-native';

import imageKeys from '../../keyText/imageKeys';
import fontKeys from '../../keyText/fontKeys';
import TaxiImageText from '../common/TaxiImageText';
import TaxiTextImage from '../common/TaxiTextImage';

const HeaderSelectDestination =(props) =>{
    return (
        <View   
                style={{
                    //flex:1,
                    alignSelf:'stretch',
                    justifyContent:'space-between',
                    flexDirection:'row',
                    alignItems:'flex-end',
                    paddingRight:46,
                    paddingLeft:16,
                   // marginLeft:30,
                    paddingBottom:15,
                    paddingTop:15,
                    borderStyle:'solid',
                    borderWidth:1,
                    borderColor:'rgba(170,170,170,0.5)',//#FFFFFF',
                    shadowColor: 'rgba(170,170,170,0.5)',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 2,
                    shadowRadius: 2,
                    elevation:2,
                }}
            >
                <TaxiImageText image={props.image1?props.image1: imageKeys.profilegrey} imageStyle={{marginRight:5}} style={{paddingBottom:-25,alignSelf:'flex-start'}}  text={props.text1? props.text1 : textKeys.rider.address.forme} func={props.func1}/>
                
                <TaxiTextImage  image={props.image2?props.image2: imageKeys.dropdown}  func ={props.func2} style={{alignSelf:'center',marginLeft:20}} text= {props.text2? props.text2 : textKeys.rider.address.change} textStyle={{color:'#5BE39B',fontSize:14,fontFamily:fontKeys.MR,textShadowColor:'rgba(4,80,110,0.5)',textShadowOffset:{width:1,height:1},textShadowRadius:0}} />
                
            </View>
    );
}
export default HeaderSelectDestination;