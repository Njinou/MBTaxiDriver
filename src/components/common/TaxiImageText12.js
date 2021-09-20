import React from 'react';
import {StyleSheet,Image,View,Text,Pressable} from 'react-native';
import fontKeys from '../../keyText/fontKeys';
import imageKeys from '../../keyText/imageKeys';
import textKeys from '../../keyText/textKeys';
import TaxiText from './TaxiText';

const TaxiImageText12= (props) =>{
    return (
        <View style={props.style? [styles.container,props.style] : styles.container}> 
            <Pressable onPress={props.imageFunc}>
             <Image  style={props.imageStyle? [styles.image,props.imageStyle,{marginTop:15}]  :[styles.image,{marginTop:15}]} source={ props.image? props.image: imageKeys.profile} />
            </Pressable>
             <View style={props.textOnlyStyle? props.textOnlyStyle:null}>
                 <Text style={[styles.input,{paddingTop:12},props.styleText1]}>{props.text1? props.text1 : ''}</Text>
                 <Text style={[styles.input,{color:'#878787',fontSize:11},props.styleText2]}> {props.text2 ? props.text2 :''}</Text>
             </View>
            
        </View>
       
    )
}
export default TaxiImageText12;

const styles = StyleSheet.create({
   container:{
       alignItems:'flex-start',
       flexDirection:'row',
       //alignItems:'center',
       paddingBottom:12,
    },
    image:{
        marginLeft:21,
        marginRight:21,
        alignSelf:'center'
    },
    textStart:{
        color:'#3F4D5F',
        fontSize:15,
        marginBottom: 10,
        textAlign:'center'
    },
    textEnd:{
        color:'#3F4D5F',
        fontSize:15,
    },
    input:{ 
       // height: 40, 
        borderColor: 'gray',
        borderWidth: 0 ,
        borderRadius:3,
        fontFamily:  fontKeys.MR,
        //paddingLeft:11,
        color:'#000000',
        fontSize:14,
        backgroundColor:'white',
    }
});
