import React from 'react';
import {StyleSheet,Image,View,Pressable} from 'react-native';
import fontKeys from '../../keyText/fontKeys';
import imageKeys from '../../keyText/imageKeys';
import TaxiText from './TaxiText';

const TaxiImageText= (props) =>{
    return (
        <Pressable onPress={props.func}>
            <View style={props.style? [styles.container,props.style] : styles.container}> 
                <Image  style={props.imageStyle? [styles.image,props.imageStyle]  :styles.image} source={ props.image? props.image: imageKeys.profile} />
                <TaxiText styleText={props.textStyle? [styles.text,props.textStyle]  : styles.text} text={props.text? props.text:"John Smith"} />
            </View>
        </Pressable>
    )
}
export default TaxiImageText;

const styles = StyleSheet.create({
   container:{
       alignItems:'flex-start',
       flexDirection:'row',
       alignItems:'center',
       paddingBottom:25,
    },
    image:{
        marginLeft:15,
        marginRight:15
    },
    text:{
        color:'#3F4D5F',
        fontSize:15
    }
});
